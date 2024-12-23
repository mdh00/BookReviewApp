import Review from "../persistance/Entities/reviews.js";
import { ReviewDTO } from "./dto/reviews.js";
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";

export const getAllReviews = async (req, res) => {
  try { 
    const { reviewId, bookId } = req.query;
    if (bookId) {
      const reviews = await Review.find({ book: bookId })
      .populate("book", ["title", "author"])
      .exec();
        console.log("Reviews:", reviews);
      return res.status(200).json(reviews);
    }
    const reviews = await Review.find()
      .populate("book", ["title", "author"])
      .exec();
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error)
  }
};

export const createReview = async (req, res) => {
  try {
    const review = ReviewDTO.safeParse(req.body);
    if (!review.success) {
      throw new ValidationError(review.error);
    }
    const newReview = new Review(review.data);
    await newReview.save();

    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try{
    const reviewId = req.params.id;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (deletedReview === null) {
      throw new NotFoundError("Review not found");
    }
    return res.status(200).send("Review deleted successfully");
  } catch (error) {
    console.log(error);
  }
} 

export const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    console.log("Fetching Review ID:", reviewId);

    const review = await Review.findById(reviewId)

    if (review === null) {
      throw new NotFoundError("Review not found");
    }
    console.log("Review:", review);
    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async (req, res) => {
  try{
    const reviewId = req.params.id;
    const review = ReviewDTO.safeParse(req.body);
    if(!review.success){
      throw new ValidationError(review.error);
    }
    const updatedReview = await Review.findByIdAndUpdate(reviewId, review.data,{new: true});
    if (updatedReview === null) {
      throw new NotFoundError("review not found");
    }
    return res.status(200).json(updatedReview);
  } catch (error) {
   console.log(error);
  }
}