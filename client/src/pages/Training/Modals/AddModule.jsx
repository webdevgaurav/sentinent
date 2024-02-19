import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FileUpload from "../../../components/Uploader/FileUpload";
import { BASE_URL } from "../../../../config";

const AddModule = ({ onOpen, onClose, productId }) => {
  const [module, setModule] = useState({
    title: "",
    thumbnail: "",
    productId: "",
    creatorId: "",
  });
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    setModule({ ...module, creatorId: user._id, productId: productId });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModule({ ...module, [name]: value });
  };

  const handleUpload = async (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    setModule({ ...module, thumbnail: path });
  };

  const handleAddModule = () => {
    fetch(`${BASE_URL}/training/module/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(module),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setModule({});
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
          <Modal.Title>Add Module</Modal.Title>
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
              value={module.title}
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
            {module.thumbnail ? (
              <img
                src={`${BASE_URL + module.thumbnail}`}
                alt="Module"
                className="w-100 h-auto"
              />
            ) : (
              <span>Perivew</span>
            )}
          </div>
          <FileUpload
            folder="module"
            fileType="image/png,image/jpeg"
            onClick={handleUpload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddModule}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModule;
