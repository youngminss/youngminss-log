declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GA_ID: string;
  }
}

interface Window {
  gtag: any;
}
