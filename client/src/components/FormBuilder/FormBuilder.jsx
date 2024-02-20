import { GrAdd, GrEdit, GrSettingsOption } from "react-icons/gr";
import { IoReorderThreeOutline } from "react-icons/io5";
import InputText from "../Elements/Input/InputText";
import { useState } from "react";
import InputTextarea from "../Elements/Input/InputTextarea";
import styles from "./FormBuilder.module.css";

const FormBuilder = () => {
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
  const getdata = () => {
    console.log(dynamicFormData[currentActiveField]);
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
      placeholder: "",
      type: e.target.name,
      label: "",
    };
    const newArray = [...dynamicFormData, newObj];
    setDynamicFormData(newArray);
  };
  const handleActiveField = (e) => {
    console.log(e.target.id);
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

  return (
    <div className="row">
      <div className="col-md-5">
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
          <div className="tab-content">
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
                <button className="mb-2 mr-2 btn btn-secondary">Select</button>
                <button className="mb-2 mr-2 btn btn-secondary" name="checkbox">
                  Video
                </button>
                <button className="mb-2 btn btn-secondary" name="checkbox">
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
                        value={dynamicFormData[currentActiveField].placeholder}
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
                        value={dynamicFormData[currentActiveField].placeholder}
                        onChange={handleEditFieldTextChange}
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
          <ul className="nav nav-tabs">
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
                      currentActiveField == index ? styles.bgActive : ""
                    }`}
                    id={index}
                    onClick={handleActiveField}
                  >
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
                      currentActiveField == index ? styles.bgActive : ""
                    }`}
                    id={index}
                    onClick={handleActiveField}
                  >
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
              ) : null
            )}
          </div>
          <button onClick={getdata}>get data</button>
        </section>
      </div>
    </div>
  );
};

export default FormBuilder;
