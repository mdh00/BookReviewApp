import BookSection from "./components/BookSection";
import AddBook from "../book/add-book/addBook";
function HomePage() {
  return (
    <main>      
      <div>
<AddBook />
        <BookSection />
      </div>
    </main>
  );
}

export default HomePage;
