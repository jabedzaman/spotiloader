import { z } from "zod";
import "dotenv/config";

export const configSchema = z.object({
  // === APP Configuration ===
  APP_NAME: z.coerce.string().default("@spotiloader/api"),
  APP_ENV: z.enum(["development", "production", "test"]).default("development"),

  // === HTTP Server Configuration ===
  HTTP_PORT: z.coerce.number().default(8080),
  HTTP_HOST: z.coerce.string().default("127.0.0.1"),

  // === Redis Configuration ===
  REDIS_URI: z.coerce
    .string()
    .startsWith("redis://")
    .default("redis://localhost:6379"),

  // === Database Configuration ===
  MONGO_URI: z.coerce
    .string()
    .refine(
      (val) => val.startsWith("mongodb://") || val.startsWith("mongodb+srv://"),
      { message: "Invalid MongoDB URI" }
    )
    .default("mongodb://localhost:27017"),
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
