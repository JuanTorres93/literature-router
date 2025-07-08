import styles from "./Button.module.scss";

function Button({ children, onClick, type }) {
  // type can be: "primary"

  const handleClick = () => {
    return onClick ? onClick() : () => {};
  };

  return (
    <button
      className={`${styles.btn} ${type ? styles[type] : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
