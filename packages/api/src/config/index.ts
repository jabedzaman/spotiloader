import { cleanEnv, str } from "envalid";
import * as dotenv from "dotenv";

dotenv.config({
    path: "../../.env",
});

export const config = cleanEnv(process.env, {
  SPOTIFY_CLIENT_ID: str(),
  SPOTIFY_CLIENT_SECRET: str(),
});