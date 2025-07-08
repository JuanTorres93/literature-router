import BookSummary from "./BookSummary";
import Button from "./Button";
import Message from "./Message";

function App() {
  return (
    <div>
      <BookSummary />
      <Button>Button</Button>
      <Button type="primary" onClick={() => alert("hey!")}>
        Button
      </Button>
      <Message>Message text</Message>
      <Message type="error">Message text</Message>
    </div>
  );
}

export default App;
