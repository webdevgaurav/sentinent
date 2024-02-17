import { useEffect, useState } from "react";
import AddTraining from "./Modals/AddTraining";
import { IoMdAdd } from "react-icons/io";
import styles from "./Training.module.css";
import CardImage from "../../components/Cards/CardImage";
import { BASE_URL } from "../../../config";
import NoRecordFound from "../../components/Errors/NoRecordFound";
import { MdDownloading } from "react-icons/md";

const Training = () => {
  const [show, setShow] = useState(false);
  const [trainigPage, setTrainigPage] = useState(1);
  const [trainingLoader, setTrainingLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTrainingLoader(false);
    const limit = 2;
    if (trainigPage) {
      fetch(
        `${BASE_URL}/products/get?search=${search}&page=${trainigPage}&limit=${limit}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(({ product, totalCount }) => {
          setTrainingLoader(true);
          setProducts([...products, ...product]);
          if (totalCount <= trainigPage * limit) {
            setTrainigPage(0);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [trainigPage]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setProducts([]);
    setTrainigPage(1);
    setShow(false);
  };
  const handleTrainingSearch = (e) => {
    if (e.key === "Enter") {
      console.log("on enter", search);
      setProducts([]);
      setTrainigPage(1);
    } else {
      setSearch(e.target.value);
    }
  };
  const handleLoadMoreTraining = () => {
    setTrainigPage(trainigPage + 1);
  };

  return (
    <>
      <AddTraining onOpen={show} onClose={handleClose} />
      <div className="d-flex align-items-center justify-content-between m-4">
        <input
          className="form-control w-25"
          type="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
          onKeyDown={handleTrainingSearch}
          onChange={handleTrainingSearch}
        />
        <button className={styles.addTrainingBtn} onClick={handleShow}>
          <IoMdAdd />
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {products.length ? (
          products.map((item, index) => <CardImage key={index} data={item} />)
        ) : (
          <NoRecordFound />
        )}
      </div>

      <div className={`loadMore ${!trainigPage && "d-none"}`}>
        <a onClick={handleLoadMoreTraining}>
          {!trainingLoader ? "Load More" : "Loading..."}
          <MdDownloading />
        </a>
      </div>
    </>
  );
};

export default Training;
