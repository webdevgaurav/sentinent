import { useNavigate, useParams } from "react-router-dom";
import AddPhases from "../Modals/AddPhases";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config";
import styles from "./Phases.module.css";
import NoRecordFound from "../../../components/Errors/NoRecordFound";
import CardImage from "../../../components/Cards/CardImage";
import { MdDownloading } from "react-icons/md";

const Phases = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [phasesPage, setPhasesPage] = useState(1);
  const [phasesLoader, setPhasesLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [phases, setPhases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPhasesLoader(false);
    const limit = 2;
    if (phasesPage) {
      fetch(
        `${BASE_URL}/phases/get/${params.productId}?search=${search}&page=${phasesPage}&limit=${limit}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPhasesLoader(true);
          if(data) {
            setPhases([...data.phases, ...phases]);
            if (data.totalCount <= phasesPage * limit) {
              setPhasesPage(0);
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [phasesPage]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setPhases([]);
    setPhasesPage(1);
    setShow(false);
  };
  const handlePhasesSearch = (e) => {
    if (e.key === "Enter") {
      console.log("on enter", search);
      setPhases([]);
      setPhasesPage(1);
    } else {
      setSearch(e.target.value);
    }
  };
  const handleLoadMorePhases = () => {
    setPhasesPage(phasesPage + 1);
  };
  const handleNavigateToModule = (item) => {
    console.log(item)
    // navigate(`/training/phases/module/${item._id}`);
  };

  return (
    <div>
      <AddPhases
        onOpen={show}
        onClose={handleClose}
        productId={params.productId}
      />
      <div className="d-flex align-items-center justify-content-between m-4">
        <input
          className="form-control w-25"
          type="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
          onKeyDown={handlePhasesSearch}
          onChange={handlePhasesSearch}
        />
        <button className={styles.addPhasesBtn} onClick={handleShow}>
          <IoMdAdd />
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {phases.length ? (
          phases.map((item, index) => (
            <CardImage
              key={index}
              data={item}
              onClick={handleNavigateToModule}
            />
          ))
        ) : (
          <NoRecordFound />
        )}
      </div>

      <div className={`loadMore ${!phasesPage && "d-none"}`}>
        <a onClick={handleLoadMorePhases}>
          {!phasesLoader ? "Load More" : "Loading..."}
          <MdDownloading />
        </a>
      </div>
    </div>
  );
};

export default Phases;
