import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FileUpload from "../../../components/Uploader/FileUpload";
import { BASE_URL } from "../../../../config";

const AddPhases = ({ onOpen, onClose, productId }) => {
  const [phases, setPhases] = useState({
    title: "",
    thumbnail: "",
    productId: "",
    creatorId: "",
  });
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    setPhases({ ...phases, creatorId: user._id, productId: productId });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhases({ ...phases, [name]: value });
  };

  const handleUpload = async (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    setPhases({ ...phases, thumbnail: path });
  };

  const handleAddPhases = () => {
    fetch(`${BASE_URL}/phases/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phases),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setPhases({});
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
          <Modal.Title>Add Phase</Modal.Title>
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
              value={phases.title}
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
            {phases.thumbnail ? (
              <img
                src={`${BASE_URL + phases.thumbnail}`}
                alt="Phases"
                className="w-100 h-auto"
              />
            ) : (
              <span>Perivew</span>
            )}
          </div>
          <FileUpload
            folder="phases"
            fileType="image/png,image/jpeg"
            onClick={handleUpload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPhases}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPhases;
