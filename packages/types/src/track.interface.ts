import { Document, ObjectId } from "mongoose";
import { ISearch } from "./search.interface";
import { IAlbum } from "./album.interface";
import { ICover } from "./cover.interface";

export interface ITrack {
  id: string;
  trackUrl: string;
  trackId?: string;
  title: string;
  duration?: number;
  year?: string;
  meta?: Map<any, any>;

  covers: ICover[] | ObjectId[] | string[];
  album?: ObjectId | string | IAlbum;
  search: ISearch | ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITrackDoc extends ITrack, Document {
  id: string;
}
