import styles from "./RandomQuestion.module.css";

function RandomQuestion() {
  // TODO Generate random question on mount
  return (
    <span className={styles.randomQuestion}>
      What's the best character in <em>The Stormlight Archive</em>?
    </span>
  );
}

export default RandomQuestion;
