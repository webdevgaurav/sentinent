import { GrAdd, GrEdit, GrSettingsOption } from "react-icons/gr";
import { IoReorderThreeOutline } from "react-icons/io5";
import InputText from "../Elements/Input/InputText";
import { useState } from "react";
import InputTextarea from "../Elements/Input/InputTextarea";
import styles from "./FormBuilder.module.css";
import VideoElement from "../Elements/Video/VideoElement";
import FileUpload from "../Uploader/FileUpload";
import { IoClose } from "react-icons/io5";
import Image from "../Elements/Image/Image";

const FormBuilder = ({ onSave, onClose }) => {
  const [dynamicFormData, setDynamicFormData] = useState([]);
  const [currentActiveField, setCurrentActiveField] = useState(-1);
  const [tabType, setTabType] = useState({
    addField: true,
    editField: false,
    setting: false,
  });
  const handleInputChange = (e) => {
    const { id, type, label, name, value, placeholder } = e.target;
    const newArray = [...dynamicFormData];
    newArray[id] = {
      ...newArray[id],
      ...{ type, label, name, value, placeholder },
    };
    setDynamicFormData(newArray);
  };
  const handleFormTabs = (e) => {
    if (e.target.id) {
      setTabType({
        addField: false,
        editField: false,
        setting: false,
        [e.target.id]: true,
      });
    }
  };
  const addFields = (e) => {
    const newObj = {
      value: "",
      text: "Text",
      placeholder: "Placeholder...",
      type: e.target.name,
      label: "Text Field",
    };
    const newArray = [...dynamicFormData, newObj];
    setDynamicFormData(newArray);
    setTabType({
      addField: false,
      editField: true,
      setting: false,
    });
    setCurrentActiveField(newArray.length - 1);
  };
  const addVideoFields = (e) => {
    const newObj = {
      videoPath: "",
      type: e.target.name,
      vidoeType: "video/*",
    };
    const newArray = [...dynamicFormData, newObj];
    setDynamicFormData(newArray);
    setTabType({
      addField: false,
      editField: true,
      setting: false,
    });
    setCurrentActiveField(newArray.length - 1);
  };
  const handleActiveField = (e) => {
    setCurrentActiveField(e.target.id);
  };
  const handleEditFieldTextChange = (e) => {
    const { name, value } = e.target;
    const newArray = [...dynamicFormData];
    newArray[currentActiveField] = {
      ...newArray[currentActiveField],
      [name]: value,
    };
    setDynamicFormData(newArray);
  };
  const handleVideoUpload = (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    const newArray = [...dynamicFormData];
    newArray[currentActiveField] = {
      ...newArray[currentActiveField],
      videoPath: path,
    };
    setDynamicFormData(newArray);
  };
  const handleImageUpload = (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    const newArray = [...dynamicFormData];
    newArray[currentActiveField] = {
      ...newArray[currentActiveField],
      imagePath: path,
    };
    setDynamicFormData(newArray);
  };
  const handleVideoTypeHeading = (e) => {
    const { name, value } = e.target;
    const newArray = [...dynamicFormData];
    newArray[currentActiveField] = {
      ...newArray[currentActiveField],
      [name]: value,
    };
    setDynamicFormData(newArray);
  };
  const handleRemoveField = () => {
    if (currentActiveField) {
      const newArray = [...dynamicFormData];
      newArray.splice(currentActiveField, 1);
      setDynamicFormData(newArray);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between m-4">
        <button
          type="button"
          className="btn btn-success"
          aria-label="Save"
          onClick={() => onSave(dynamicFormData)}
        >
          Save
        </button>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </div>
      <div className="row m-2">
        <div className={`col-md-5 ${styles.boxShadow}`}>
          <section className="m-2">
            <ul className="nav nav-tabs">
              <li className="nav-item cursor-pointer">
                <a
                  className={`nav-link ${tabType.addField && "active"}`}
                  id="addField"
                  onClick={handleFormTabs}
                >
                  <GrAdd />
                  &nbsp; Add a Field
                </a>
              </li>
              <li className="nav-item cursor-pointer">
                <a
                  className={`nav-link ${tabType.editField && "active"}`}
                  id="editField"
                  onClick={handleFormTabs}
                >
                  <GrEdit />
                  &nbsp; Edit Field
                </a>
              </li>
              <li className="nav-item cursor-pointer">
                <a
                  className={`nav-link ${tabType.setting && "active"}`}
                  id="setting"
                  onClick={handleFormTabs}
                >
                  <GrSettingsOption />
                  &nbsp; Form Settings
                </a>
              </li>
            </ul>
            <div className="tab-content mt-3">
              {tabType.addField && (
                <div className="mt-4 d-flex flex-col flex-wrap">
                  <button
                    className="mb-2 mr-2 btn btn-secondary"
                    name="text"
                    onClick={addFields}
                  >
                    Text Field
                  </button>
                  <button
                    className="mb-2 mr-2 btn btn-secondary"
                    name="textarea"
                    onClick={addFields}
                  >
                    Text Area
                  </button>
                  <button
                    className="mb-2 mr-2 btn btn-secondary"
                    name="radio"
                    onClick={addFields}
                  >
                    Radio Button
                  </button>
                  <button
                    className="mb-2 mr-2 btn btn-secondary"
                    name="checkbox"
                    onClick={addFields}
                  >
                    Checkboxe
                  </button>
                  <button
                    className="mb-2 mr-2 btn btn-secondary"
                    name="select"
                    onClick={addFields}
                  >
                    Select
                  </button>
                  <button
                    className="mb-2 mr-2 btn btn-secondary"
                    name="video"
                    onClick={addVideoFields}
                  >
                    Video
                  </button>
                  <button
                    className="mb-2 btn btn-secondary"
                    name="image"
                    onClick={addFields}
                  >
                    Image
                  </button>
                </div>
              )}
              {tabType.editField &&
                (dynamicFormData[currentActiveField] &&
                dynamicFormData[currentActiveField].type === "text" ? (
                  <div className="tab-pane active in" role="tabpanel">
                    <form className="customizable-field-options selected">
                      <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                          className="form-control"
                          name="label"
                          value={dynamicFormData[currentActiveField].label}
                          onChange={handleEditFieldTextChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Placeholder</label>
                        <input
                          className="form-control"
                          name="placeholder"
                          value={
                            dynamicFormData[currentActiveField].placeholder
                          }
                          onChange={handleEditFieldTextChange}
                        />
                      </div>
                    </form>
                  </div>
                ) : dynamicFormData[currentActiveField] &&
                  dynamicFormData[currentActiveField].type === "textarea" ? (
                  <div className="tab-pane active in" role="tabpanel">
                    <form className="customizable-field-options selected">
                      <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                          className="form-control"
                          name="label"
                          value={dynamicFormData[currentActiveField].label}
                          onChange={handleEditFieldTextChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Placeholder</label>
                        <input
                          className="form-control"
                          name="placeholder"
                          value={
                            dynamicFormData[currentActiveField].placeholder
                          }
                          onChange={handleEditFieldTextChange}
                        />
                      </div>
                    </form>
                  </div>
                ) : dynamicFormData[currentActiveField] &&
                  dynamicFormData[currentActiveField].type === "video" ? (
                  <div className="tab-pane active in" role="tabpanel">
                    <form className="customizable-field-options selected">
                      <div className="form-group">
                        <label className="form-label">Heading</label>
                        <input
                          className="form-control"
                          name="heading"
                          value={dynamicFormData[currentActiveField].heading}
                          onChange={handleVideoTypeHeading}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Video</label>
                        <FileUpload
                          folder="moduleVideos"
                          fileType="video/*"
                          onClick={handleVideoUpload}
                        />
                      </div>
                    </form>
                  </div>
                ) : dynamicFormData[currentActiveField] &&
                  dynamicFormData[currentActiveField].type === "image" ? (
                  <div className="tab-pane active in" role="tabpanel">
                    <form className="customizable-field-options selected">
                      <div className="form-group">
                        <label className="form-label">Text</label>
                        <input
                          className="form-control"
                          name="text"
                          value={dynamicFormData[currentActiveField].text}
                          onChange={handleEditFieldTextChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Image</label>
                        <FileUpload
                          folder="moduleImages"
                          fileType="image/png,image/jpeg"
                          onClick={handleImageUpload}
                        />
                      </div>
                    </form>
                  </div>
                ) : null)}
            </div>
          </section>
        </div>

        <div className="col-md-7">
          <section className="m-2">
            <ul className="nav nav-tabs d-flex justify-content-between mb-3">
              <li className="nav-item">
                <a className={`nav-link active`}>
                  <IoReorderThreeOutline />
                  &nbsp; Editor
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {dynamicFormData.map((field, index) =>
                field.type === "text" ? (
                  <>
                    <div
                      className={`p-1 cursor-pointer rounded ${
                        currentActiveField == index && styles.bgActive} ${styles.boxShadow} mt-2`}
                      id={index}
                      onClick={handleActiveField}
                    >
                      {currentActiveField == index && (
                        <IoClose
                          className="float-end m-1 fs-2"
                          id={index}
                          onClick={handleRemoveField}
                        />
                      )}
                      <InputText
                        key={index}
                        fields={{
                          index: index,
                          type: field.type,
                          label: field.label,
                          name: field.name,
                          value: field.value,
                          placeholder: field.placeholder,
                        }}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : field.type === "textarea" ? (
                  <>
                    <div
                      className={`p-1 cursor-pointer rounded ${
                        currentActiveField == index && styles.bgActive} ${styles.boxShadow} mt-2`}
                      id={index}
                      onClick={handleActiveField}
                    >
                      {currentActiveField == index && (
                        <IoClose
                          className="float-end m-1 fs-2"
                          id={index}
                          onClick={handleRemoveField}
                        />
                      )}
                      <InputTextarea
                        key={index}
                        fields={{
                          index: index,
                          label: field.label,
                          value: field.value,
                        }}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : field.type === "video" ? (
                  <>
                    <div
                      className={`p-1 pt-3 cursor-pointer rounded ${
                        currentActiveField == index && styles.bgActive} ${styles.boxShadow} mt-2`}
                      id={index}
                      onClick={handleActiveField}
                    >
                      {currentActiveField == index && (
                        <IoClose
                          className="float-end m-1 fs-2"
                          id={index}
                          onClick={handleRemoveField}
                        />
                      )}
                      <VideoElement
                        key={index}
                        index={index}
                        heading={field.heading}
                        videoPath={field.videoPath}
                      />
                    </div>
                  </>
                ) : field.type === "image" ? (
                  <>
                    <div
                      className={`p-1 pt-3 cursor-pointer rounded ${
                        currentActiveField == index && styles.bgActive} ${styles.boxShadow} mt-2`}
                      id={index}
                      onClick={handleActiveField}
                    >
                      {currentActiveField == index && (
                        <IoClose
                          className="float-end m-1 fs-2"
                          id={index}
                          onClick={handleRemoveField}
                        />
                      )}
                      <Image imagePath={field.imagePath} text={field.text} />
                    </div>
                  </>
                ) : null
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
