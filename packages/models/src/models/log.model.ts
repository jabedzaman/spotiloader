import mongoose, { Schema } from "mongoose";
import { ILogDoc } from "@spotiloader/types";
import { CONSTS } from "../CONSTS";
import { toJson } from "~/plugins";

/**
 * Log Schema
 * This schema is used to store log entries for the application.
 * It includes fields for the level, message, and timestamps for creation and updates.
 * It is designed to be flexible for different logging levels and messages.
 */
const logSchema = new Schema<ILogDoc>(
  {
    level: {
      type: String,
      enum: ["info", "warn", "error", "debug"], // define the allowed values for the level
      required: true, // level is required
    },
    message: { type: String, required: true }, // message is required
    createdAt: { type: Date, default: Date.now }, // createdAt is automatically set to the current date and time
    updatedAt: { type: Date, default: Date.now }, // updatedAt is also automatically set to the current date and time
  },
  {
    timestamps: true, // enable automatic timestamps for createdAt and updatedAt
    collection: CONSTS.COLLECTIONS.LOGS, // explicitly set the collection name
  }
);

// Plugins
logSchema.plugin(toJson); // for converting documents to JSON format

export const Log = mongoose.model<ILogDoc>(CONSTS.COLLECTIONS.LOGS, logSchema);
