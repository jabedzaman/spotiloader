import mongoose, { Schema } from "mongoose";
import { ITrackDoc } from "@spotiloader/types";
import { CONSTS } from "../CONSTS";
import { toJson } from "~/plugins";

/**
 * Track Schema
 * This schema defines the structure of tracks in the MongoDB database.
 * Each track has a unique URL, title, duration, year, and metadata.
 * It also has references to albums and covers.
 */
const trackSchema = new Schema<ITrackDoc>(
  {
    trackUrl: { type: String, required: true, unique: true }, // unique URL for the track
    trackId: { type: String }, // optional track ID
    title: { type: String, required: true }, // title of the track
    duration: { type: Number }, // duration of the track in seconds
    year: { type: String }, // year of release
    cached: {
      on_disk: { type: Boolean, default: false }, // whether the track is cached on disk
      status: {
        type: String,
        enum: ["pending", "downloading", "done", "error"], // status of the caching process
        default: "pending",
      },
      on_s3: { type: Boolean, default: false }, // whether the track is cached on s3
      error: { type: String }, // error message if the track is in error state
      uploadedAt: { type: Date }, // date when the track was uploaded to s3
    }, // whether the track is cached on server
    downloads: { type: Number, default: 0 }, // number of downloads
    meta: { type: Map }, // metadata for the track

    removed: { type: Boolean, default: false }, // whether the track is removed
    removedAt: { type: Date }, // date when the track was removed
    removedReason: { type: String }, // reason for removing the track

    covers: [{ type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.COVERS }], // references to covers for the track
    album: { type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.ALBUMS }, // reference to the album the track belongs to
    search: { type: Schema.Types.ObjectId, ref: CONSTS.COLLECTIONS.SEARCHES }, // reference to the search the track belongs to
  },
  {
    timestamps: true, // apply timestamps for createdAt and updatedAt
    collection: CONSTS.COLLECTIONS.TRACKS, // explicitly set the collection name
  }
);

// Indexes can be added to improve query performance
trackSchema.index({ trackUrl: 1, trackId: 1 }, { unique: true }); // unique index on trackUrl and trackId
trackSchema.index({ title: 1, year: 1 }); // index on title and year
trackSchema.index({ album: 1 }); // index on album
trackSchema.index({ search: 1 }); // index on search

// Plugins
trackSchema.plugin(toJson); // for converting documents to JSON format

// Pre save hook
trackSchema.pre<ITrackDoc>("save", function (next) {
  const track = this;
  // if any changes made to cached.on_s3, and its true, set uploadedAt to current date
  if (track.isModified("cached.on_s3") && track.cached.on_s3) {
    track.cached.uploadedAt = new Date();
  }
  next();
});

/**
 * Define the model for the Track collection in the MongoDB database.
 * This model will be used to interact with the tracks in the database.
 */
export const Track = mongoose.model<ITrackDoc>(
  CONSTS.COLLECTIONS.TRACKS,
  trackSchema
);
