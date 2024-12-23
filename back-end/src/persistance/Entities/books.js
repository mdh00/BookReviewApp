import mongoose from "mongoose";
import reviewsSchema from "./reviews.js";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    // reviews: [reviewsSchema],

    // averageRating: {
    //     type: Number,
    //     default: 0
    // },

});

const Book = mongoose.model("Book", bookSchema);

export default Book;