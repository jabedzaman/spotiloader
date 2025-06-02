import { config } from "./config";

/**
 * self ping at / to check if the service is up
 */
export const ping = async () => {
  let tries = 0;
  const maxTries = 10;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  while (tries < maxTries) {
    try {
      await fetch(`http://${config.HTTP_HOST}:${config.HTTP_PORT}`);
      break; // exit loop if successful
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      };
    }
    tries++;
    await delay(1000); // wait 1 second before retrying
  }
};
