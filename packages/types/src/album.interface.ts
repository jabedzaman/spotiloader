import { Document, ObjectId } from "mongoose";
import { ISearch } from "./search.interface";
import { ITrack } from "./track.interface";

export interface IAlbum {
  id: string;
  albumUrl: string;
  albumId?: string;
  title: string;
  year?: number;
  meta?: Map<any, any>;

  tracks: ObjectId[] | ITrack[] | string[];
  search?: string | ISearch | ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlbumDoc extends IAlbum, Document {
  id: string;
}
