import express from "express";
import { createReview, getAllReviews, getReviewById, deleteReview, updateReview } from "../application/reviews.js";

const reviewsRouter = express.Router();

reviewsRouter
    .route("/")
    .post( createReview)
    .get(getAllReviews);

reviewsRouter
    .route("/:id")
    .get(getReviewById)
    .delete(deleteReview)
    .put(updateReview);

export default reviewsRouter;