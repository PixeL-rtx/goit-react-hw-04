import css from "./ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <div className={css.errorContainer}>
      <p className={css.Text}>There are no more images on your search!</p>
    </div>
  );
};

export default ErrorMessage;
