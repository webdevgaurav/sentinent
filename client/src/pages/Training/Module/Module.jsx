import { useParams } from "react-router-dom";
import AddModule from "../Modals/AddModule";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config";
import styles from "./Module.module.css";
import NoRecordFound from "../../../components/Errors/NoRecordFound";
import CardImage from "../../../components/Cards/CardImage";
import { MdDownloading } from "react-icons/md";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";

const Module = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [modulePage, setModulePage] = useState(1);
  const [moduleLoader, setModuleLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [module, setModule] = useState([]);

  useEffect(() => {
    setModuleLoader(false);
    const limit = 2;
    if (modulePage) {
      fetch(
        `${BASE_URL}/training/module/get/${params.phasesId}?search=${search}&page=${modulePage}&limit=${limit}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setModuleLoader(true);
          if (data) {
            setModule([...data.module, ...module]);
            if (data.totalCount <= modulePage * limit) {
              setModulePage(0);
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [modulePage]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setModule([]);
    setModulePage(1);
    setShow(false);
  };
  const handleShowModuleForm = () => {
    setShowModuleForm(true);
  };
  const handleModuleFormClose = () => {
    setShowModuleForm(false);
  };
  const handleModuleSearch = (e) => {
    if (e.key === "Enter") {
      setModule([]);
      setModulePage(1);
    } else {
      setSearch(e.target.value);
    }
  };
  const handleLoadMoreModule = () => {
    setModulePage(modulePage + 1);
  };
  const handleOnSave = (data) => {
    console.log(data);
  };
  return (
    <div>
      <AddModule onOpen={show} onClose={handleClose} params={params} />
      {showModuleForm ? (
        <FormBuilder onSave={handleOnSave} onClose={handleModuleFormClose} />
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-between m-4">
            <input
              className="form-control w-25"
              type="search"
              value={search}
              placeholder="Search"
              aria-label="Search"
              onKeyDown={handleModuleSearch}
              onChange={handleModuleSearch}
            />
            <button className={styles.addModuleBtn} onClick={handleShow}>
              <IoMdAdd />
            </button>
          </div>
          <div className="d-flex flex-wrap">
            {module.length ? (
              module.map((item, index) => (
                <CardImage
                  key={index}
                  data={item}
                  onClick={handleShowModuleForm}
                />
              ))
            ) : (
              <NoRecordFound />
            )}
          </div>

          <div className={`loadMore ${!modulePage && "d-none"}`}>
            <a onClick={handleLoadMoreModule}>
              {!moduleLoader ? "Load More" : "Loading..."}
              <MdDownloading />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Module;
