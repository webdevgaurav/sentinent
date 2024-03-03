import { useContext, useState } from "react";
import styles from "./Profile.module.css";
import { BASE_URL } from "../../../config";
import { Navigate } from "react-router-dom";
import FileUpload from "../../components/Uploader/FileUpload";
import UserContext from "../../contexts/UserContext";

const Profile = () => {
  const { userInfo, updateUserInfo, isUserLoggedIn, isUserUpdated } =
    useContext(UserContext);
  const [formData, setFormData] = useState(userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(formData);
  };

  const handleUpload = async (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    setFormData({ ...formData, profile: path });
  };

  return (
    <>
      {!isUserLoggedIn && <Navigate to="/login" replace={true} />}
      <div className={styles.container}>
        <div className="d-flex">
          <img src={`${BASE_URL + formData.profile}`} alt="Preview" />
        </div>
        <FileUpload
          folder="profiles"
          fileType="image/png,image/jpeg"
          onClick={handleUpload}
        />

        <form className="row g-3">
          <div className="col-md-4">
            <label htmlFor="validationServer01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationServer01"
              required
              value={formData.firstname}
              name="firstname"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="validationServer02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationServer02"
              required
              value={formData.lastname}
              name="lastname"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="validationServerUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend3">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationServerUsername"
                aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                required
                value={formData.username}
                name="username"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationServer03" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="validationServer03"
              aria-describedby="validationServer03Feedback"
              required
              value={formData.city}
              name="city"
              onChange={handleChange}
            />
            <div id="validationServer03Feedback" className="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationServer04" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="validationServer03"
              aria-describedby="validationServer03Feedback"
              required
              value={formData.state}
              name="state"
              onChange={handleChange}
            />
            <div id="validationServer04Feedback" className="invalid-feedback">
              Please select a valid state.
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationServer05" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="validationServer05"
              aria-describedby="validationServer05Feedback"
              required
              value={formData.zipcode}
              name="zipcode"
              onChange={handleChange}
            />
            <div id="validationServer05Feedback" className="invalid-feedback">
              Please provide a valid zip.
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary green" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
      {isUserUpdated && (
        <div className="d-flex align-items-center justify-content-center">
          <div className="alert alert-primary d-inline" role="alert">
            <span>User Updated Successfully!!!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
