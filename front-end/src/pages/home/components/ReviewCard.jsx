import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";

function ReviewCard(props) {
  return (
      <Card>
        <CardHeader>
          <CardTitle>"{props.review.reviewText}"</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>{props.review.rating}/5</CardContent>
        <CardFooter className="gap-x-4">
                <div className="flex justify-end w-full">
                    <div className="flex gap-6">
                        <Pencil
                            className="cursor-pointer text-green-700"
                            onClick={(e) => {
                                e.preventDefault();
                                props.onUpdate(props.review);
                            }}
                        />
                        <Trash
                            className="cursor-pointer text-red-500"
                            onClick={(e) => {
                                e.preventDefault();
                                props.onDelete(props.review._id);
                            }}
                        />
                    </div>
                </div>
            </CardFooter>
      </Card>
  );
}

export default ReviewCard;
