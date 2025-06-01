import mongoose, { Schema } from "mongoose";
import { ISearchDoc } from "@spotiloader/types";
import { CONSTS } from "../CONSTS";

/**
 * Search Schema
 * This schema is used to store search results for tracks, albums, playlists, and artists.
 * It includes fields for the URL, type of search, platform, status, and references to related tracks and albums.
 */
const searchSchema = new Schema<ISearchDoc>(
  {
    url: { type: String, required: true, unique: true }, // unique URL for the search
    type: { type: String, enum: ["TRACK", "ALBUM", "PLAYLIST", "ARTIST"] }, // type of search (track, album, playlist, artist)
    platform: { type: String, enum: ["YOUTUBE", "SPOTIFY"] }, // platform where the search was performed
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"], // status of the search
      required: true,
    },
    tracks: [{ type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.TRACKS }], // references to tracks found in the search
    albums: [{ type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.ALBUMS }], // references to albums found in the search
  },
  {
    timestamps: true, // apply timestamps for createdAt and updatedAt
    collection: CONSTS.COLLECTIONS.SEARCHES, // explicitly set the collection name
  }
);

// Indexes can be added to improve query performance
searchSchema.index({ url: 1, platform: 1 }, { unique: true }); // unique index on url and platform
searchSchema.index({ type: 1, status: 1 }); // index for type and status

/**
 * Define the model for the Search collection in the MongoDB database.
 * This model will be used to interact with the searches in the database.
 */
export const Search = mongoose.model<ISearchDoc>(
  CONSTS.COLLECTIONS.SEARCHES,
  searchSchema
);
