import styles from "./Message.module.css";

function Message({ children, type }) {
  // Type can be: "error"
  return (
    <div className={`${styles.message} ${type ? styles[type] : ""}`}>
      <p>
        <span>{type ? `${type}: ` : ""}</span> {children}
      </p>
    </div>
  );
}

export default Message;
