/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  /** LINE Official Account ID เช่น @napaii (ใช้กับปุ่ม "จองทาง LINE") */
  readonly VITE_LINE_OA_ID?: string;
  /** เบอร์ Call Center เช่น 02-123-4567 (ปุ่มโทรในแผงจองทัวร์) */
  readonly VITE_CALL_CENTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
