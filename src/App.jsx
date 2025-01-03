import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import fetchGallery from "./sevice/api";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [gallery, setGallery] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [queryValue, setQueryValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [altDescription, setAltDescription] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    if (!queryValue) return;

    const handleSearch = async () => {
      try {
        setLoading(true);
        const data = await fetchGallery(queryValue, page);
        setGallery((prevgallery) => [...prevgallery, ...data.results]);
        setTotalPages(data.total_pages);
        if (!data.results.length) {
          toast.error(`Nothing was found for the word "${queryValue}"`);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [page, queryValue]);

  useEffect(() => {
    if (page === 1) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [page, gallery]);

  const handleQuery = (newQuery) => {
    setQueryValue(newQuery);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const isActive = useMemo(() => page === totalPages, [page, totalPages]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const updateModalState = (src, alt) => {
    setModalImage(src);
    setAltDescription(alt);
  };
  return (
    <div ref={ref}>
      <SearchBar onSubmit={handleQuery} />
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          openModal={openModal}
          updateModalStateData={updateModalState}
        />
      )}
      {Loading && <Loader />}
      {Error && <ErrorMessage />}
      {gallery.length > 0 && !Loading && !Error && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isActive={isActive} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage}
        alt={altDescription}
      />
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default App;
