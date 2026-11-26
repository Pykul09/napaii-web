import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { authService, type ProfileUpdate, type SignInInput, type SignUpInput } from '../services/auth';
import type { SocialProvider, User } from '../types';

export type AuthMode = 'signin' | 'signup';

interface AuthContextValue {
  user: User | null;
  modal: { open: boolean; mode: AuthMode };
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  setAuthMode: (mode: AuthMode) => void;
  signIn: (input: SignInInput) => Promise<User>;
  signUp: (input: SignUpInput) => Promise<User>;
  social: (provider: SocialProvider) => Promise<User>;
  updateProfile: (input: ProfileUpdate) => Promise<User>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getSession());
  const [modal, setModal] = useState<{ open: boolean; mode: AuthMode }>({ open: false, mode: 'signin' });

  const openAuth = useCallback((mode: AuthMode = 'signin') => setModal({ open: true, mode }), []);
  const closeAuth = useCallback(() => setModal((m) => ({ ...m, open: false })), []);
  const setAuthMode = useCallback((mode: AuthMode) => setModal((m) => ({ ...m, mode })), []);

  const signIn = useCallback(async (input: SignInInput) => {
    const u = await authService.signIn(input);
    setUser(u);
    return u;
  }, []);
  const signUp = useCallback(async (input: SignUpInput) => {
    const u = await authService.signUp(input);
    setUser(u);
    return u;
  }, []);
  const social = useCallback(async (provider: SocialProvider) => {
    const u = await authService.social(provider);
    setUser(u);
    return u;
  }, []);
  const updateProfile = useCallback(async (input: ProfileUpdate) => {
    const u = await authService.updateProfile(input);
    setUser(u);
    return u;
  }, []);
  const signOut = useCallback(() => {
    authService.signOut();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, modal, openAuth, closeAuth, setAuthMode, signIn, signUp, social, updateProfile, signOut }),
    [user, modal, openAuth, closeAuth, setAuthMode, signIn, signUp, social, updateProfile, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
