export const getBooks = async () => {
    const res = await fetch("http://localhost:8000/api/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };
  
  export const getBookById = async (id) => {
    const res = await fetch(`http://localhost:8000/api/books/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch book");
    }
    const data = await res.json();
    return data;
  };

  export const createBook = async (data) => {
    const res = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: data.title,
            author: data.author,
        }),
    });
  }