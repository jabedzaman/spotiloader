import mongoose, { Schema } from "mongoose";
import { ICoverDoc } from "@spotiloader/types";
import { CONSTS } from "../CONSTS";
import { toJson } from "~/plugins";

/**
 * Cover Schema
 * This schema defines the structure of covers in the MongoDB database.
 * Each cover has a unique URL, width, height, and references to the track and album it belongs to.
 */
const coverSchema = new Schema<ICoverDoc>(
  {
    url: { type: String, required: true, unique: true }, // unique URL for the cover
    width: { type: Number, required: true }, // width of the cover in pixels
    height: { type: Number, required: true }, // height of the cover in pixels

    track: { type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.TRACKS }, // reference to the track the cover belongs to
  },
  {
    timestamps: true, // apply timestamps for createdAt and updatedAt
    collection: CONSTS.COLLECTIONS.COVERS, // explicitly set the collection name
  }
);

// Plugins
coverSchema.plugin(toJson); // for converting documents to JSON format

export const Cover = mongoose.model<ICoverDoc>(
  CONSTS.COLLECTIONS.COVERS,
  coverSchema
);
