import * as ytdl from "@distube/ytdl-core";

export const getVideo = async (url: string) => {
  return ytdl.getInfo(url);
};
