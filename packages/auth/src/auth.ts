import { betterAuth } from "better-auth";
import { toNextJsHandler } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { db } from "./db";

export const auth = betterAuth({
  database: {
    db: db as any,
    type: "postgres",
  },
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [admin()],
  trustedOrigins: [...process.env.TRUSTED_ORIGINS!.split("")],
});

export const nextJsHandlers = toNextJsHandler(auth);
