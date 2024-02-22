import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    rating: [
      {
        type: Number,
        min: 0,
        max: 5,
        required: true,
      },
    ],
    review: [
      {
        type: String,
        required: true,
      },
    ],
    takinguserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    givinguserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Ratings", ratingSchema);
export default Rating;
