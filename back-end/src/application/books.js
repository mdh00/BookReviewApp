import Book from "../persistance/Entities/books.js";
import { BookDTO } from "./dto/books.js";
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";

export const createBook = async (req, res) => {
    try {
      const book = BookDTO.safeParse(req.body);
      if (!book.success) {
        throw new ValidationError(book.error);
      }
      const newBook = new Book(book.data);
      await newBook.save();
  
      return res.status(201).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  };

  export const getAllBooks = async (req, res) => {
    try {
      const allbooks = await Book.find()
      return res.status(200).json(allbooks);
    } catch (error) {
      console.log(error);
    }
  };

  export const getBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (book === null) {
        throw new NotFoundError("Book not found");
      }
      return res.status(200).json(book);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  };