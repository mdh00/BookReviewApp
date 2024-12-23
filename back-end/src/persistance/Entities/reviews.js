import mongoose from "mongoose";

const {Schema} = mongoose;

const reviewsSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    rating: {
        type: Number,
        required: true,
      },
    reviewText: {
        type: String,
    },
    dateAdded:{
        type: Date,
        default: () => new Date().toLocaleString()
      },
})

const reviews = mongoose.model('Review', reviewsSchema);

export default reviews;