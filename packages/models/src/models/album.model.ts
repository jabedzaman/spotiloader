import mongoose, { Schema } from "mongoose";
import { IAlbumDoc } from "@spotiloader/types";
import { CONSTS } from "../CONSTS";

/**
 * Album Schema
 * This schema defines the structure of albums in the MongoDB database.
 * Each album has a unique URL, title, year, and metadata.
 * It also has references to tracks and searches.
 */
const albumSchema = new Schema<IAlbumDoc>(
  {
    albumUrl: { type: String, required: true, unique: true }, // unique URL for the album
    albumId: { type: String }, // optional album ID
    title: { type: String, required: true }, // title of the album
    year: { type: Number }, // year of release
    meta: { type: Map }, // metadata for the album

    tracks: [{ type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.TRACKS }], // references to tracks in the album
    search: { type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.SEARCHES }, // reference to the search the album belongs to
  },
  {
    timestamps: true, // apply timestamps for createdAt and updatedAt
    collection: CONSTS.COLLECTIONS.ALBUMS, // explicitly set the collection name
  }
);

// Indexes can be added to improve query performance
albumSchema.index({ albumUrl: 1 }, { unique: true }); // ensure albumUrl is unique
albumSchema.index({ title: 1 }); // index on title for faster searches

export const Album = mongoose.model<IAlbumDoc>(
  CONSTS.COLLECTIONS.ALBUMS,
  albumSchema
);
