import mongoose from "mongoose";

/**
 *
 * @param id - The string representation of an ObjectId.
 * @returns A Mongoose ObjectId instance.
 */
export const toObjectId = (id: string): mongoose.Types.ObjectId => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
};
