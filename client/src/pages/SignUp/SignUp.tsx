import { useState } from "react";
import styles from "./SignUp.module.css";
import { BASE_URL } from "../../../config";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickHandleCreateUser = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
        setIsSignedUp(true);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className={styles.container}>
      {isSignedUp && <Navigate to="/login" replace={true}/>}
      <div className={styles.signUpLeft}>
        <div className="d-flex align-items-center justify-content-between">
          <h3>Sign Up</h3>
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="username"
              value={userDetails.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
            <div id="emailHelp" className="form-text">
              We wll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={onClickHandleCreateUser} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
