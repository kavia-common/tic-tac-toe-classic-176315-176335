/// <reference types="vite/client" />

// PUBLIC_INTERFACE
declare module '*.svg' {
  const content: string;
  export default content;
}
