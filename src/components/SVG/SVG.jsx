import styles from "./SVG.module.scss";

function SVG({ isFull, children, className = "", onClick = () => {} }) {
  // NOTE: children must be an svg element
  return (
    <div
      className={`${styles.svg} ${
        isFull ? styles.svg____full : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default SVG;
