import { Document, ObjectId } from "mongoose";
import { ISearch } from "./search.interface";
import { IAlbum } from "./album.interface";
import { ICover } from "./cover.interface";

export interface ITrack {
  id: string;
  trackUrl: string;
  trackId?: string;
  title: string;
  artists: string[];
  duration?: number;
  cached: {
    on_disk: boolean;
    on_s3: boolean;
    status: "pending" | "downloading" | "done" | "error";
    error?: string;
    uploadedAt?: Date;
  };
  year?: string;
  meta?: Map<any, any>;
  downloads: number;

  removed: boolean;
  removedAt?: Date;
  removedReason?: string;

  covers: ICover[] | ObjectId[] | string[];
  album?: ObjectId | string | IAlbum;
  search: ISearch | ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITrackDoc extends ITrack, Document {
  id: string;
}
