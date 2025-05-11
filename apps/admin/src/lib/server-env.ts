import "server-only";

export const serverConfig = {
  B2_APPLICATION_KEY_ID: process.env.B2_APPLICATION_KEY_ID!,
  B2_APPLICATION_KEY: process.env.B2_APPLICATION_KEY!,
  B2_ENDPOINT: process.env.B2_ENDPOINT!,
  B2_REGION: process.env.B2_REGION!,
  B2_BUCKET: process.env.B2_BUCKET!,
  MONGODB_URI: process.env.MONGODB_URI,
};
