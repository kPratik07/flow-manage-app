import { config } from 'dotenv'
config()

// Optional: Add type safety for environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            NEXTAUTH_SECRET: string;
            NEXTAUTH_URL?: string;  // Make it optional
        }
    }
}

export { }  // Make this a module