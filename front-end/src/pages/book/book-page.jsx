import { React, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getBookById } from '@/lib/api/books';
import { getReviewsForBook, updateReview } from '@/lib/api/reviews';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview, deleteReview } from '@/lib/api/reviews';
import { Separator } from '@/components/ui/separator';
import ReviewCard from '../home/components/ReviewCard';
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"


const BookPage = () => {
  const [book, setBook] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');

  const [selectedReview, setSelectedReview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


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

  const handleUpdate = (review) => {
    setSelectedReview({
      ...review,
      book: book._id,
    });
    setIsDialogOpen(true);
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
      <p className="italic mb-4">{book.author}</p>
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
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <p>No reviews found.</p>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <Button variant="outline" className="hidden">Edit Review</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[725px]" >
    <DialogHeader>
      <DialogTitle>Edit Review</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="reviewText" className="text-right">Message</Label>
        <Textarea
          id="reviewText"
          value={selectedReview?.reviewText || ""}
          onChange={(e) =>
            setSelectedReview((prev) => ({ ...prev, reviewText: e.target.value }))
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="rating" className="text-right">Rating</Label>
        <select
          value={selectedReview?.rating || ""}
          onChange={(e) =>
            setSelectedReview((prev) => ({ ...prev, rating: Number(e.target.value) }))
          }
          className="border border-input rounded-md px-3 py-2 bg-black"
        >
          <option value="" disabled>Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
    <DialogFooter>
      <Button
        type="button"
        onClick={async () => {
          try {
            if (selectedReview?._id) {
              console.log("Selected Review:", selectedReview);
              // Call the updateReview function
              await updateReview(selectedReview._id, {
                rating: selectedReview.rating,
                reviewText: selectedReview.reviewText,
                book: selectedReview.book,
              });

              console.log({
                rating: selectedReview.rating,
                reviewText: selectedReview.reviewText,
                book: selectedReview.book?._id,
              });
              

              // Refresh reviews
              const updatedReviews = await getReviewsForBook(book._id);
              setReviews(updatedReviews || []);

              // Close the dialog
              setIsDialogOpen(false);

              Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Review updated successfully.",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          } catch (error) {
            console.error("Failed to update review:", error);

            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to update review. Please try again.",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        }}
      >
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>



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
              setRating(0);
              setReviewText("");
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