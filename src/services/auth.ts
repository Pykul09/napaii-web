import type { Profile, ProfileInput, SocialProvider, User } from '../types';
import { digitsOnly } from '../utils/validation';
import { sleep } from '../utils/format';
import { storage } from './storage';

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  profile: ProfileInput;
}
export interface SignInInput {
  email: string;
  password: string;
}
/** ข้อมูลที่แก้ได้ในหน้าโปรไฟล์ (อีเมลแก้ไม่ได้ — มาจากบัญชี/ผู้ให้บริการ login) */
export interface ProfileUpdate {
  firstName: string;
  lastName: string;
  /** YYYY-MM-DD หรือ '' = ไม่ระบุ */
  birthDate: string;
  /** '' = ไม่ระบุ */
  phone: string;
}

/** รหัสข้อผิดพลาด — UI แปลเป็นข้อความตามภาษาผ่าน key `auth.err.<CODE>` */
export type AuthErrorCode = 'EMAIL_TAKEN' | 'BAD_CREDENTIALS';

export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
  }
}

/**
 * สัญญา (interface) ของระบบ login — UI เรียกผ่านตัวนี้เท่านั้น
 * เมื่อมี backend จริง ให้เขียน class ใหม่ที่ implements AuthService
 * (เช่น เรียก REST API / Firebase Auth / Supabase Auth) แล้วสลับ export `authService` ด้านล่าง
 * และ throw AuthError ด้วยรหัสเดิมเพื่อให้ข้อความแปลภาษาทำงานต่อได้
 */
export interface AuthService {
  getSession(): User | null;
  signUp(input: SignUpInput): Promise<User>;
  signIn(input: SignInInput): Promise<User>;
  social(provider: SocialProvider): Promise<User>;
  /** แก้ข้อมูลโปรไฟล์ของผู้ใช้ที่ล็อกอินอยู่ (ทั้งบัญชีอีเมลและบัญชีที่ล็อกอินผ่าน Apple/Google/Facebook) */
  updateProfile(input: ProfileUpdate): Promise<User>;
  signOut(): void;
}

interface StoredAccount {
  name: string;
  salt: string;
  hash: string;
  profile?: Profile;
}

const USERS_KEY = 'napaii_users';
const SESSION_KEY = 'napaii_session';
/** โปรไฟล์ของบัญชี social (key = provider:email) — เก็บไว้ให้ล็อกอินครั้งหน้าข้อมูลยังอยู่ */
const SOCIAL_KEY = 'napaii_social_profiles';

interface StoredSocial {
  name: string;
  profile?: Profile;
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(salt + password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * เวอร์ชันสาธิต: เก็บบัญชีใน localStorage ของเบราว์เซอร์เท่านั้น
 * ห้ามใช้จริง — ไม่มีเซิร์ฟเวอร์ตรวจสอบ ไม่ปลอดภัยพอสำหรับข้อมูลผู้ใช้
 *
 * เลขบัตรประชาชน: เวอร์ชันนี้เก็บเฉพาะ 4 หลักท้าย ไม่เก็บเลขเต็ม
 * ในระบบจริง ส่งเลขเต็มไปให้ backend ผ่าน HTTPS เท่านั้น แล้วเข้ารหัสก่อนเก็บ
 */
class LocalDemoAuthService implements AuthService {
  private accounts(): Record<string, StoredAccount> {
    return storage.get<Record<string, StoredAccount>>(USERS_KEY, {});
  }

  private start(user: User): User {
    storage.set(SESSION_KEY, user);
    return user;
  }

  getSession(): User | null {
    return storage.get<User | null>(SESSION_KEY, null);
  }

  async signUp({ name, email, password, profile }: SignUpInput): Promise<User> {
    await sleep(700);
    const key = email.toLowerCase();
    const accounts = this.accounts();
    if (accounts[key]) throw new AuthError('EMAIL_TAKEN');

    const stored: Profile = {
      birthDate: profile.birthDate,
      phone: profile.phone,
      gender: profile.gender,
      ...(profile.nationalId ? { nationalIdLast4: digitsOnly(profile.nationalId).slice(-4) } : {}),
    };
    const salt = crypto.randomUUID();
    accounts[key] = { name, salt, hash: await hashPassword(password, salt), profile: stored };
    storage.set(USERS_KEY, accounts);
    return this.start({ name, email: key, provider: 'email', profile: stored });
  }

  async signIn({ email, password }: SignInInput): Promise<User> {
    await sleep(700);
    const key = email.toLowerCase();
    const account = this.accounts()[key];
    if (!account || account.hash !== (await hashPassword(password, account.salt))) {
      throw new AuthError('BAD_CREDENTIALS');
    }
    return this.start({ name: account.name, email: key, provider: 'email', profile: account.profile });
  }

  /**
   * โหมดสาธิต: ล็อกอินเป็นผู้ใช้ตัวอย่าง (ยังไม่มี profile)
   * ของจริง (OAuth 2.0 / OpenID Connect) ทำฝั่ง backend เช่น
   *   window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
   * แล้วให้ backend redirect กลับมาพร้อม session cookie
   */
  async social(provider: SocialProvider): Promise<User> {
    await sleep(1100);
    const email = `demo.${provider}@example.com`;
    // ข้อมูลที่ผู้ใช้เคยกรอกในหน้าโปรไฟล์ (ของจริง: backend เก็บคู่กับบัญชี Apple/Google/Facebook)
    const saved = storage.get<Record<string, StoredSocial>>(SOCIAL_KEY, {})[`${provider}:${email}`];
    return this.start({ name: saved?.name ?? 'Demo User', email, provider, profile: saved?.profile });
  }

  async updateProfile({ firstName, lastName, birthDate, phone }: ProfileUpdate): Promise<User> {
    await sleep(600);
    const current = this.getSession();
    if (!current) throw new AuthError('BAD_CREDENTIALS');
    const name = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
    const profile: Profile = { ...current.profile, birthDate, phone, gender: current.profile?.gender ?? 'undisclosed' };
    const next: User = { ...current, name, profile };

    if (current.provider === 'email') {
      const accounts = this.accounts();
      const acc = accounts[current.email];
      if (acc) {
        accounts[current.email] = { ...acc, name, profile };
        storage.set(USERS_KEY, accounts);
      }
    } else {
      const all = storage.get<Record<string, StoredSocial>>(SOCIAL_KEY, {});
      all[`${current.provider}:${current.email}`] = { name, profile };
      storage.set(SOCIAL_KEY, all);
    }
    return this.start(next);
  }

  signOut(): void {
    storage.set(SESSION_KEY, null);
  }
}

export const authService: AuthService = new LocalDemoAuthService();
