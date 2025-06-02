import { z } from "zod";
import "dotenv/config";

export const configSchema = z.object({
  // === APP Configuration ===
  APP_NAME: z.coerce.string().default("@spotiloader/api"),
  APP_ENV: z.enum(["development", "production", "test"]).default("production"),

  // === HTTP Server Configuration ===
  HTTP_PORT: z.coerce.number().default(8080),
  HTTP_HOST: z.coerce.string().default("127.0.0.1"),

  // === Redis Configuration ===
  REDIS_URI: z.coerce.string().default("redis://localhost:6379"),

  // === Database Configuration ===
  MONGO_URI: z.coerce.string().default("mongodb://localhost:27017"),

  // === S3 Configuration ===
  S3_ENDPOINT: z.coerce.string().default("http://localhost:9000"),
  S3_ACCESS_KEY: z.coerce.string().default("minioadmin"),
  S3_SECRET_KEY: z.coerce.string().default("minioadmin"),
  S3_BUCKET: z.coerce.string().default("spotiloader"),
  S3_REGION: z.coerce.string().default("us-east-1"),
  S3_FORCE_PATH_STYLE: z.coerce.boolean().default(true),
  S3_USE_SSL: z.coerce.boolean().default(false),
});

export type Config = z.infer<typeof configSchema>;

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  throw new Error(
    `Invalid environment variables: ${parsedConfig.error.issues
      .map((issue) => issue.message)
      .join(", ")}`
  );
}

export const config = parsedConfig.data;
