import styles from "./PlainMessage.module.scss";

function PlainMessage({ children }) {
  return <div className={styles.plainMessage}>{children}</div>;
}

export default PlainMessage;
