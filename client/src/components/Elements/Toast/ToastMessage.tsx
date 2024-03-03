import { Toast, ToastContainer } from "react-bootstrap";
import styles from "./ToastMessage.module.css";

const ToastMessage = ({ show, toast }) => {
  const { type, title, message } = toast;
  return (
    <ToastContainer
      position="bottom-end"
      className={`${styles.toastContainer}`}
    >
      <Toast show={show} className="d-inline-block m-1" bg={type}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className={type === 'success' && 'text-white'}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
