import { z } from "zod";

export const ReviewDTO = z.object({
    book: z.string().min(1, "Book ID is required"),
    rating: z.number().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5"),
    reviewText: z.string().optional(),
    dateAdded: z.date().optional(),
});