import { z } from "zod";

export const BookDTO = z.object({
    title: z.string().min(1, "Book title is required"),
    author: z.string().min(1, "Author is required"),
    
});