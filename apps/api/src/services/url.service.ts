import { Platform } from "@spotiloader/types";
import { CONSTS } from "~/CONSTS";

const platformRegexes: Record<Platform, RegExp> = {
  SPOTIFY: CONSTS.REGEX.SPOTIFY,
  YOUTUBE: CONSTS.REGEX.YOUTUBE,
};

/**
 * URL Service
 * This service provides functionality to parse URLs and determine the platform.
 * It uses regular expressions to match URLs against known patterns for different platforms.
 */
export const urlService = {
  // parse a URL end get the platform
  parseUrl: async (url: string): Promise<Platform | undefined> => {
    // use regex to determine the platform
    for (const [platform, regex] of Object.entries(platformRegexes)) {
      if (regex.test(url)) {
        return platform as Platform;
      }
    }
  },
};
