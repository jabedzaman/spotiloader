import { cleanEnv, str } from "envalid";
import * as dotenv from "dotenv";

dotenv.config({
    path: "../../.env",
});

export const config = cleanEnv(process.env, {
  SPOTIFY_CLIENT_ID: str(),
  SPOTIFY_CLIENT_SECRET: str(),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
  APP_PORT: str({ default: "4000" }),
  APP_NAME: str({ default: "spotiloader-API" }),
  APP_URL: str({ default: "http://localhost:4000" }),
});