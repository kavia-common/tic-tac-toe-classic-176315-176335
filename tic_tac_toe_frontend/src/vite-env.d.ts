/// <reference types="vite/client" />

// PUBLIC_INTERFACE
declare module '*.svg' {
  // Vite will convert imported SVGs to URL strings by default
  const src: string;
  export default src;
}
