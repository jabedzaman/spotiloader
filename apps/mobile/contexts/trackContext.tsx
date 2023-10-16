import * as React from "react";
import * as SecureStore from "expo-secure-store";
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
}

interface ITrackContext {
  tracks: ITrack[];
  searchTrack: (url: string) => void;
}

const TrackContext = React.createContext<ITrackContext>({
  tracks: [],
  searchTrack: () => {},
});

export function useTracks() {
  const context = React.useContext(TrackContext);
  if (!context) {
    throw new Error("useTracks must be used within a TrackProvider");
  }
  return context;
}

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = React.useState<ITrack[]>([]);

  const searchTrack = async (url: string) => {
    try {
      console.log(axiosInstance.defaults.headers["x-api-key"]);
      console.log(axiosInstance.defaults.baseURL);
      console.log(url);
      const { data } = await axiosInstance.get(`/track?uri=${url}`);
      setTracks((prev) => [
        {
          url,
          metadata: data,
          isDownloaded: false,
          lastSearched: new Date(),
        },
        ...prev,
      ]);
      await SecureStore.setItemAsync(
        "tracks",
        JSON.stringify([
          {
            url,
            metadata: data,
            isDownloaded: false,
            lastSearched: new Date(),
          },
          ...tracks,
        ])
      );
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const getTracks = async () => {
      try {
        const tracks = await SecureStore.getItemAsync("tracks");
        if (tracks) {
          setTracks(JSON.parse(tracks));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTracks();
  }, []);
  return (
    <TrackContext.Provider
      value={{
        searchTrack,
        tracks,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}
