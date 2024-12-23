import { React, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getBookById } from '@/lib/api/books';
import { getReviewsForBook } from '@/lib/api/reviews';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview, deleteReview } from '@/lib/api/reviews';
import { Separator } from '@/components/ui/separator';
import ReviewCard from '../home/components/ReviewCard';
import Swal from 'sweetalert2';

const BookPage = () => {
  const [book, setBook] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

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
      }
      ).finally(() => setIsLoading(false));

      setIsLoading(true);

    getReviewsForBook(params._id)
      .then((reviews) => {
        setReviews(reviews || []);
        setIsError(false);
      }) 
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => setIsLoading(false));
      console.log("Reviews for book:", params._id,  reviews);
  }, [params._id]);

  console.log(reviews);


  const [formData, setFormData] = useState({
    rating: '',
    reviewText: ''
  });

  const addReviewHandle = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        bookId: book._id,
        rating,
        reviewText,
      });
      const updatedReviews = await getReviewsForBook(book._id);
      setReviews(updatedReviews || []);
      setReviewText("");
      setRating(0);

      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Your review has been successfully submitted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to submit review. Please try again.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });
  
    if (result.isConfirmed) {
      try {
        await deleteReview(id);
  
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
  
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "review deleted successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete review:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete review. Please try again.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <main>
      <h2 className='pt-5'>{book.title}</h2>
      <p class="italic mb-4">{book.author}</p>
      <Separator />

      <div className="py-8">
                <div className='text-xl font-medium'>What people think about {book.title}</div>
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 w-full mx-auto mt-6">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review._id}
                                review={review}
                                _id={review._id}
                                bookId={params._id}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        <p>No reviews found.</p>
                    </div>
                )}
            </div>

      <form className="w-full py-8 flex flex-col gap-y-8" onSubmit={addReviewHandle}>

      <Label>Tell us what do you think about {book.title}</Label>
        <Textarea
          type="text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
        />

        <Label>Rating</Label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-1/6 border border-input rounded-md px-3 py-2 bg-black"
        >
          <option value="" disabled className='text-gray-400'>
            Select Rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <div className="flex gap-x-4 items-center">
          <Button type="submit" className="bg-card text-card-foreground w-fit">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => {
              setRating(0); // Reset the rating state to 0 (or default)
              setReviewText(""); // Clear the review text
            }}
            className="w-fit"
            variant="outline"
          >
            Clear
          </Button>

        </div>

      </form>

    </main>

  )
}

export default BookPage