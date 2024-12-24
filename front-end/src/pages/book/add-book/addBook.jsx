import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBook } from "@/lib/api/books";

export function AddBook() {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert("Title and author are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createBook({ title, author });
      alert("Book created successfully!");
      setTitle("");
      setAuthor("");
    } catch (error) {
      console.error("Failed to create book:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="mb-6">Add Book</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-6">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Add new Book</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <input
                      id="title"
                      placeholder="Title of new Book"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Label htmlFor="author">Author</Label>
                    <input
                      id="author"
                      placeholder="Author of new Book"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog.Close asChild>
                <Button variant="destructive"
                  disabled={isSubmitting}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
              variant="secondary"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddBook;
