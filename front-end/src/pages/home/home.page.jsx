import BookSection from "./components/BookSection";
import AddBook from "../book/add-book/addBook";
function HomePage() {
  return (
    <main>
      <div>
        <div className="mt-8">
          <AddBook />
        </div>
        <BookSection />
      </div>
    </main>
  );
}

export default HomePage;
