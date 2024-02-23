import { Button, Modal } from "react-bootstrap";

const DeleteItem = ({ item, onOpen, onClose, onDelete }) => {
  return (
    <>
      <Modal show={onOpen}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {item.title}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onDelete(item)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteItem;
