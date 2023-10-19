import * as React from "react";
import { axiosInstance } from "../utils/axiosInstance";

export interface ITrack {
  url: string;
  metadata: {
    name: string;
    artists: string[];
    album_name: string;
    release_date: string;
    cover_url: string;
  };
  isDownloaded: boolean;
  lastSearched: Date;
  downloadProgress: number;
  downloading: boolean;
}

interface ITrackContext {
  track: ITrack | null;
  isLoading: boolean;
  error: string | null;
  isError: boolean;
  searchTrack: (url: string) => void;
  downloadTrack: () => void;
}

const TrackContext = React.createContext<ITrackContext>({
  track: null,
  isLoading: false,
  error: null,
  isError: false,
  searchTrack: () => {},
  downloadTrack: () => {},
});

export function useTracks() {
  const context = React.useContext(TrackContext);
  if (!context) {
    throw new Error("useTracks must be used within a TrackProvider");
  }
  return context;
}

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = React.useState<ITrack>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<number>(0);
  const [downloading, setDownloading] = React.useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = React.useState<boolean>(false);

  const searchTrack = async (url: string): Promise<ITrack | undefined> => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/track?uri=${url}`);
      console.log("data at contect", data);
      setTrack({
        url: url,
        metadata: {
          album_name: data.album_name,
          artists: data.artists,
          cover_url: data.cover_url,
          name: data.name,
          release_date: data.release_date,
        },
        isDownloaded,
        lastSearched: new Date(),
        downloadProgress: progress,
        downloading,
      });
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
      return undefined;
    }
  };
  const downloadTrack = async () => {
    
  };
  return (
    <TrackContext.Provider
      value={{
        searchTrack,
        downloadTrack,
        track,
        isLoading,
        error,
        isError: !!error,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}
