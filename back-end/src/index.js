import Express from "express";
import reviewsRouter from "./api/reviews.js";
import booksRouter from "./api/books.js";
import "dotenv/config"; 
import { connectDB } from "./persistance/db.js";
import cors from "cors";

const app = Express();

app.use(Express.json());
app.use(cors({
    origin: ["http://localhost:5173"]
  }));

connectDB()

app.use("/api/reviews", reviewsRouter);
app.use("/api/books", booksRouter);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Webservice is listening on ${PORT}`);
})
