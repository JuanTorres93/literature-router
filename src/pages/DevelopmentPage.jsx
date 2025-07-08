import BookSummary from "../components/BookSummary";
import Button from "../components/Button";
import Message from "../components/Message";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

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
