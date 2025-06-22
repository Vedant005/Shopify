import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    requried: true,
  },
  itemType: {
    type: String,
    requied: true,
  },
  description: {
    type: String,
    requied: true,
  },
  coverImage: {
    type: String,
    requied: true,
  },
  additionalImages: [String],
});

export const Item = mongoose.model("Item", itemSchema);
