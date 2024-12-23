import BookCard from "./BookCard";
import { useState, useEffect } from "react";
import { getBooks } from "@/lib/api/books";

function BookSection() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getBooks()
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsError(true);
        setIsLoading(false);
      }
    );
  }, []);


  return (
    <section className="py-8">
      <h2>Browse Books</h2>
      <div className="mt-4 flex flex-col gap-y-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4 w-full mx-auto">
        {books.map((book) => {
          return (
            <BookCard key={book._id} book={book} />
          );
        })}
        </div>
      </div>
    </section>
  );
}

export default BookSection;
