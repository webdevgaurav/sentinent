import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FileUpload from "../../../components/Uploader/FileUpload";
import { BASE_URL } from "../../../../config";

const AddTraining = ({ onOpen, onClose }) => {
  const [product, setProduct] = useState({
    title: "",
    thumbnail: "",
    price: "",
    creatorId: "",
  });
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    setProduct({ ...product, creatorId: user._id });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpload = async (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    setProduct({ ...product, thumbnail: path });
  };

  const handleAddTraining = () => {
    fetch(`${BASE_URL}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setProduct({});
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Modal show={onOpen} onHide={() => onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12">
            <label htmlFor="validationServer01" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="validationServer01"
              required
              name="title"
              value={product.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="validationServer02" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="validationServer02"
              required
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div
            className="mt-2 mb-2"
            style={{
              height: "250px",
              display: "flex",
              maxWidth: "600px",
              overflow: "hidden",
              alignItems: "center",
              border: "1px solid #ddd",
              justifyContent: "center",
              backgroundColor: "#fefefe",
              borderRadius: "0.25rem 0.25rem 0 0",
            }}
          >
            {product.thumbnail ? (
              <img
                src={`${BASE_URL + product.thumbnail}`}
                alt="Product"
                className="w-100 h-auto"
              />
            ) : (
              <span>Perivew</span>
            )}
          </div>
          <FileUpload
            folder="products"
            fileType="image/png,image/jpeg"
            onClick={handleUpload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTraining}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTraining;
