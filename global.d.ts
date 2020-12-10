/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }

  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT:number;
    PUBLIC_URL: string;
  }
}
