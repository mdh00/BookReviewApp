import express from "express";
import { createBook, getAllBooks, getBookById } from "../application/books.js";

const booksRouter = express.Router();

booksRouter
    .route("/")
    .post( createBook)
    .get(getAllBooks)

booksRouter
    .route("/:id")
    .get(getBookById)

export default booksRouter;