import { S3Client } from "@aws-sdk/client-s3";
import { serverConfig } from "../server-env";

export const cdnConfig = {
  CDN_CLOUDFLARE: "https://service-hosted-files.tbdh.dev", // personal setup Cloudflare CDN
  DEFAULT_BUCKET: serverConfig.B2_BUCKET,
};

export const s3Client = new S3Client({
  endpoint: serverConfig.B2_ENDPOINT,
  region: serverConfig.B2_REGION,
  credentials: {
    accessKeyId: serverConfig.B2_APPLICATION_KEY_ID,
    secretAccessKey: serverConfig.B2_APPLICATION_KEY,
  },
});
