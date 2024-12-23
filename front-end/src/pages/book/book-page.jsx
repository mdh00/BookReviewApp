import {React, useState, useEffect} from 'react'
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getBookById } from '@/lib/api/books';

const BookPage = () => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params._id) {
      return;
    }
    getBookById(params._id)
      .then((book) => {
        setBook(book);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsError(true);
        setIsLoading(false);
      }
    );
  }, [params._id]);

  return (
    <main>
    <h2 className='pt-5'>{book.title}</h2>
    </main>

  )
}

export default BookPage