export const createReview = async (data) => {
    const res = await fetch("http://localhost:8000/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rating: data.rating,
            reviewText: data.reviewText,
            book: data.bookId,
        }),
    });
};

export const getReviewsForBook = async (bookId) => {
    const res = await fetch(`http://localhost:8000/api/reviews?bookId=${bookId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch reviews for book");
    }
    const data = await res.json();
    return data;
};

export const getReviewById = async (reviewId) => {
    const res = await fetch(`http://localhost:8000/api/reviews/${reviewId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch review");
    }
    console.log("Review id:", reviewId);
    const data = await res.json();
    return data;
};


export const deleteReview = async (reviewId) => {
    const res = await fetch(`http://localhost:8000/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const updateReview = async (reviewId, updatedData) => {
    try {
        const res = await fetch(`http://localhost:8000/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!res.ok) {
            throw new Error("Failed to update review");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
