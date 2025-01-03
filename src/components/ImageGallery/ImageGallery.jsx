import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
const ImageGallery = ({ gallery, openModal, updateModalState }) => {
  return (
    <ul className={css.Container}>
      {gallery.map(({ id, alt_description, url }) => (
        <li className={css.cardItem} key={id} onClick={openModal}>
          <ImageCard
            urls={url}
            alt_description={alt_description}
            updateModalStateData={updateModalState}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
