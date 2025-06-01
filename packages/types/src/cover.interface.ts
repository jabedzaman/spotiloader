import { Document, ObjectId } from "mongoose";
import { ITrack } from "./track.interface";

export interface ICover {
  id: string;
  url: string;
  width: number;
  height: number;

  track?: ITrack | string | ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICoverDoc extends ICover, Document {
  id: string;
}
