import BookSummary from "../components/BookSummary/BookSummary";
import Button from "../components/Button/Button";
import Message from "../components/Message/Message";
import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";

function DevelopmentPage() {
  return (
    <div>
      <NavBar />
      <BookSummary />
      <Button>Button</Button>
      <Button type="primary" onClick={() => alert("hey!")}>
        Button
      </Button>
      <Message>Message text</Message>
      <Message type="error">Message text</Message>
      <SearchBar />
    </div>
  );
}

export default DevelopmentPage;
