import { useState, useEffect } from "react";
import { decode } from "he";
import styles from "./RandomQuestion.module.scss";

import Loader from "../Loader/Loader";
import Message from "../Message/Message";

function RandomQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerIsShown, setAnswerIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const res = await fetch(
          "https://opentdb.com/api.php?amount=1&category=10&type=multiple"
        );

        // If too many requests, then preserve previous question and answer
        if (res.status === 429) return;

        const data = await res.json();
        const questionData = data?.results?.length > 0 && data.results[0];

        setQuestion(questionData.question);
        setAnswer(questionData.correct_answer);
      } catch (error) {
        console.log("error");
        console.log(error);

        setError("Error when fetching question");
        setQuestion("");
        setAnswer("");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && question && (
        <span
          onClick={() => setAnswerIsShown((prev) => !prev)}
          className={styles.randomQuestion}
        >
          {answerIsShown ? decode(answer) : decode(question)}
        </span>
      )}
      {!isLoading && error && <Message type="error"> {error}</Message>}
    </>
  );
}

export default RandomQuestion;
