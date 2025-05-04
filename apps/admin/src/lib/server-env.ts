import "server-only";

export const serverConfig = {
  B2_APPLICATION_KEY_ID: process.env.B2_APPLICATION_KEY_ID!,
  B2_APPLICATION_KEY: process.env.B2_APPLICATION_KEY!,
  MONGODB_URI: process.env.MONGODB_URI,
};
