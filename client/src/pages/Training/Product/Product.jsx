import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloading } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import AddProduct from "../Modals/AddProduct";
import CardImage from "../../../components/Cards/CardImage";
import { BASE_URL } from "../../../../config";
import NoRecordFound from "../../../components/Errors/NoRecordFound";
import styles from "./Product.module.css";

const Product = () => {
  const [show, setShow] = useState(false);
  const [productPage, setProductPage] = useState(1);
  const [productLoader, setProductLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProductLoader(false);
    const limit = 2;
    if (productPage) {
      fetch(
        `${BASE_URL}/products/get?search=${search}&page=${productPage}&limit=${limit}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(({ product, totalCount }) => {
          setProductLoader(true);
          setProducts([...products, ...product]);
          if (totalCount <= productPage * limit) {
            setProductPage(0);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [productPage]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setProducts([]);
    setProductPage(1);
    setShow(false);
  };
  const handleProductSearch = (e) => {
    if (e.key === "Enter") {
      console.log("on enter", search);
      setProducts([]);
      setProductPage(1);
    } else {
      setSearch(e.target.value);
    }
  };
  const handleLoadMoreProduct = () => {
    setProductPage(productPage + 1);
  };
  const handleNavigateToModule = (item) => {
    navigate(`/training/phases/${item._id}`);
  };
  
  return (
    <>
      <AddProduct onOpen={show} onClose={handleClose} />
      <div className="d-flex align-items-center justify-content-between m-4">
        <input
          className="form-control w-25"
          type="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
          onKeyDown={handleProductSearch}
          onChange={handleProductSearch}
        />
        <button className={styles.addProductBtn} onClick={handleShow}>
          <IoMdAdd />
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {products.length ? (
          products.map((item, index) => (
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

      <div className={`loadMore ${!productPage && "d-none"}`}>
        <a onClick={handleLoadMoreProduct}>
          {!productLoader ? "Load More" : "Loading..."}
          <MdDownloading />
        </a>
      </div>
    </>
  );
};

export default Product;
