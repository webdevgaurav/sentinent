import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";

const ModuleForm = ({ onOpen, onClose, params }) => {
  const [moduleForm, setModuleForm] = useState({});
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
  }, []);

  const handleModuleForm = () => {};
  return (
    <>
      <Modal show={onOpen} onHide={() => onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Create Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormBuilder></FormBuilder>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModuleForm}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModuleForm;
