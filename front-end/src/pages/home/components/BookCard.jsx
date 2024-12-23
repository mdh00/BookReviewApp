import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Link } from "react-router-dom";

function BookCard(props) {
  return (
    <Link to={`/book/${props.book._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{props.book.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>{props.book.author}</CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default BookCard;
