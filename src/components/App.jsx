import BookSummary from "./BookSummary";
import Button from "./Button";

function App() {
  return (
    <div>
      <BookSummary />
      <Button>Button</Button>
      <Button type="primary" onClick={() => alert("hey!")}>
        Button
      </Button>
    </div>
  );
}

export default App;
