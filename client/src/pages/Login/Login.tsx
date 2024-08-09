import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { BASE_URL } from "../../../config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/useAuth";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/dashboard");
  }, [auth.isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickHandleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/login`,
        {
          email: userDetails.email,
          password: userDetails.password,
        },
        { withCredentials: true }
      );
      setUserDetails({ email: "", password: "" });
      setAuth({ isAuthenticated: true });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
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
