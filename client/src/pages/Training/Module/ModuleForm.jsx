import { useEffect, useState } from "react";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";

const ModuleForm = ({ onOpen, onClose, params }) => {
  const [moduleForm, setModuleForm] = useState({});
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
  }, []);

  const handleOnSave = (data) => {
    console.log(data);
  };
  const handleModuleForm = () => {};
  return (
    <>
      <div className="d-flex align-items-center justify-content-between m-4">
        <div></div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </div>
      <FormBuilder onSave={handleOnSave} />
    </>
  );
};

export default ModuleForm;
