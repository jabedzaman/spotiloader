import { Document, ObjectId } from "mongoose";
import { ITrack } from "./track.interface";
import { IAlbum } from "./album.interface";

export enum SearchType {
  TRACK = "TRACK",
  ALBUM = "ALBUM",
  PLAYLIST = "PLAYLIST",
  ARTIST = "ARTIST",
}

export enum Platform {
  YOUTUBE = "YOUTUBE",
  SPOTIFY = "SPOTIFY",
}

export enum SearchStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface ISearch {
  id: string;
  url: string;
  type: SearchType;
  platform: Platform;
  status: SearchStatus;

  tracks: ITrack[] | string[] | ObjectId[];
  albums: string[] | ObjectId[] | IAlbum[];

  createdAt: Date;
  updatedAt: Date;
}

export interface ISearchDoc extends ISearch, Document {
  id: string;
}
