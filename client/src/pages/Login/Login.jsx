import { useState } from "react";
import styles from "./Login.module.css";
import { BASE_URL } from "../../../config";
import { Link, Navigate } from "react-router-dom";

const Login = ({ type }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  if (type === "logout") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickHandleLogin = (e) => {
    e.preventDefault();
    fetch(
      `${BASE_URL}/login?email=${userDetails.email}&password=${userDetails.password}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUserDetails({
          email: "",
          password: "",
        });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.container}>
      {isLoggedIn && <Navigate to="/profile" replace={true} />}
      <div className={styles.loginLeft}>
        <div className="d-flex align-items-center justify-content-between">
          <Link to={"/signup"} className="btn btn-primary">
            Sign Up
          </Link>
          <h3>Login</h3>
        </div>
        <form>
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
          <button onClick={onClickHandleLogin} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
