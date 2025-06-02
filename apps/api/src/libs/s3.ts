import { S3Client } from "@aws-sdk/client-s3";
import { config } from "~/config";

const {
  S3_ENDPOINT,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_REGION,
  S3_FORCE_PATH_STYLE,
} = config; // Better DX

/**
 * S3 Client
 * This client is used to interact with the S3 service.
 * It is configured with the necessary credentials and settings.
 */
export const s3Client = new S3Client({
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  region: S3_REGION,
  forcePathStyle: S3_FORCE_PATH_STYLE,
});
