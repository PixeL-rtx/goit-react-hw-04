import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ gallery, openModal, updateModalState }) => {
  return (
    <ul className={css.Container}>
      {gallery.map(({ id, alt_description, urls }) => (
        <li className={css.cardItem} key={id} onClick={openModal}>
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            updateModalState={updateModalState}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
