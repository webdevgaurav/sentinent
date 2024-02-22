import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { BASE_URL } from "../../../config";
import { Navigate } from "react-router-dom";
import FileUpload from "../../components/Uploader/FileUpload";

const Profile = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    zipcode: "",
    profile: "",
  });

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      fetch(`${BASE_URL}/users/get/${user.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          user = data;
          setIsUserLoggedIn(true);
          setFormData(user);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => {
          throw error;
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitUser();
  };

  const handleUpload = async (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    setFormData({ ...formData, profile: path });
  };

  function submitUser() {
    fetch(`${BASE_URL}/users/create/${formData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsUserUpdated(true);
        setTimeout(() => {
          setIsUserUpdated(false);
        }, 2000);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        throw error;
      });
  }

  return (
    <>
      {!isUserLoggedIn && <Navigate to="/login" replace={true} />}
      <div className={styles.container}>
        <div className="d-flex">
          <img src={`${BASE_URL+formData.profile}`} alt="Preview" />
        </div>
        <FileUpload folder="profiles" fileType="image/png,image/jpeg" onClick={handleUpload} />

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
              value={formData.firstName}
              name="firstName"
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
              value={formData.lastName}
              name="lastName"
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
