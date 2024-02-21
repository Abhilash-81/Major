import Rating from "../models/ratings.js";
import expressAsyncHandler from "express-async-handler";

export const getRating = expressAsyncHandler(async (req, res) => {
  try {
    const ratings = await Rating.find({ takinguserId: req.params.userId });
    res.status(200).json(ratings);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
      err: error,
    });
  }
});

export const createRating = expressAsyncHandler(async (req, res) => {
  try {
    const { givinguserId, takinguserId, rating, review } = req.body;
    const newRating = new Rating({
      givinguserId,
      takinguserId,
      rating,
      review,
    });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
      err: error,
    });
  }
});
