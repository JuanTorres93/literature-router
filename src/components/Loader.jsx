import styles from "./Loader.module.scss";

function Loader({ type = "loader" }) {
  return <div className={styles[type]}></div>;
}

export default Loader;
