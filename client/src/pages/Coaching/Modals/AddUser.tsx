import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FileUpload from "../../../components/Uploader/FileUpload";
import { BASE_URL } from "../../../../config";
import Dropdown from "../../../components/Elements/Dropdown/Dropdown";

const AddUser = ({ onOpen, onClose, userDetails }) => {
  const options_userType = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Coach",
      value: "coach",
    },
    {
      label: "Client",
      value: "client",
    },
  ];
  const options_user_status = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "Active",
    },
  ];
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    details: {},
    userType: "",
    status: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (Object.keys(userDetails).length) {
      setUser(userDetails);
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpload = async (path) => {
    if (!path) {
      alert("Please select a file");
      return;
    }
    setUser({ ...user, profile: path });
  };

  const handleAddUser = () => {
    console.log(user)
    fetch(`${BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setUser({});
        onClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleUserTypeDrowpown = (value) => {
    setUser({ ...user, userType: value });
  };
  const handleUserStatusDrowpown = (value) => {
    setUser({ ...user, status: value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Modal show={onOpen} onHide={() => onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Object.keys(userDetails).length ? "Edit" : "Add"} User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="validationServer01" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="validationServer01"
                required
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationServer02" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="validationServer02"
                required
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationServer03" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="validationServer03"
                required
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Dropdown
                title="User Type"
                options={options_userType}
                onClick={handleUserTypeDrowpown}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationServer04" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="validationServer04"
                required
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            {!Object.keys(userDetails).length && (
              <div className="col-md-6">
                <label htmlFor="validationServer05" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="validationServer05"
                  required
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <input
                  type="checkbox"
                  id="show-password"
                  onClick={handleShowPassword}
                />{" "}
                Show Password
              </div>
            )}
            <div className="col-md-6">
              <Dropdown
                title="Status"
                options={options_user_status}
                value={user.status ? user.status : "active"}
                onClick={handleUserStatusDrowpown}
              />
            </div>
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
            {user.profile ? (
              <img
                src={`${BASE_URL + user.profile}`}
                alt="Product"
                className="w-100 h-auto"
              />
            ) : (
              <span>Perivew</span>
            )}
          </div>
          <FileUpload
            folder="users"
            fileType="image/png,image/jpeg"
            onClick={handleUpload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUser;
