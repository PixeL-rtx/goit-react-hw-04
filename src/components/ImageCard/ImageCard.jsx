import css from "./ImageCard.module.css";
// const ImageCard = ({ alt_description, urls, updateModalState }) => {
//   return (
//     <div
//       className={css.cardWrapper}
//       onClick={() => updateModalState(urls.regular, alt_description)}
//     >
//       <img className={css.cardImage} src={urls.small} alt={alt_description} />
//     </div>
//   );
// };

const ImageCard = ({ alt_description, urls, updateModalState }) => {
  if (!urls || !urls.small || !urls.regular) {
    // console.error("Invalid image data:", urls);
    return null;
  }

  return (
    <div
      className={css.cardWrapper}
      onClick={() => updateModalState(urls.regular, alt_description)}
    >
      <img
        className={css.cardImage}
        src={urls.small}
        alt={alt_description || "No description"}
      />
    </div>
  );
};

export default ImageCard;
