import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../image/homelogin.png";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/user/login`, {
        username,
        password,
      });
      if (response.data.status) {
        console.log("Login successful:", response.data);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/dashboard";
        });
      } else {
        // If status is false, login failed
        setError(
          response.data.message ||
            "Invalid username or password. Please try again."
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            response.data.message ||
            "Invalid username or password. Please try again.",
        });
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100 ">
      <div className="login border shadow">
        <img src={logo} className="login_img" alt="logo" />
        <h2 className="mb-3 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="form-group  was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="admin@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex justify-between gap-5">
            <div className="form-group  form-check mb-2 loginCheck">
              <input
                type="checkbox"
                id="checkbox"
                className="form-check-input"
              />
              <label htmlFor="checkbox" className="form-check-label " required>
                Remember me
              </label>
            </div>
            <Link to="/forgotPassword">
              <p className="text-primary loginForgot">Forgot password?</p>
            </Link>
          </div>

          <button type="submit" className="btn block mt-2 w-100 btn-dark-blue">
            Log in
          </button>
          <div className="footer">
            Insuring Your Driving <span className="font">Adventure</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
