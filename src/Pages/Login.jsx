import React, { useState } from "react";
import logo from "../assets/images/logo-white.png";
import "../index.css";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAPI } from "../Services/allAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";


const Login = () => {
  const dispatch=useDispatch();
  const navigate =useNavigate()
  const [userData, setUserdata] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    console.log(userData);
    const { email, password } = userData;
    if (!email || !password) {
      toast.info("Please complete the form");
      return; // Return early if form is incomplete
    }
    try {
      dispatch(showLoading())
      const result = await loginAPI({ email, password });
      dispatch(hideLoading())
      console.log(result);
      if (result.status === 200) {
        // Login successful
        console.log(result.data.token);
        console.log(result.data.user.username);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user",result.data.user.username)
        console.log("Login succesfull");
        toast.success("Login successful")
        navigate('/');
      } else if (result.status === 401) {
        // Incorrect password
        toast.error("Incorrect password. Please try again.");
      } else {
        // Other errors
        toast.error("Login failed. Please try again later.");
      }
    } catch (error) {
      dispatch(hideLoading())
      console.error("Error occurred while logging in:", error);
      toast.error(
        "Invalid Credentials"
      );
    }
  };

  return (
    <>
      <div className="grid place-items-center h-screen login">
        <div className="login-bg"></div>
        <div
          style={{ zIndex: 1 }}
          className="bg-white wrapper flex flex-col items-center px-7 py-9 lg:w-1/4 border-1 rounded-lg"
        >
          <img
            className="my-3"
            style={{ height: "4.5rem", width: "8rem" }}
            src={logo}
            alt=""
          />
          <TextField
            onChange={(e) =>
              setUserdata({ ...userData, email: e.target.value })
            }
            type="email"
            inputProps={{
              style: { color: "white" },
            }}
            className="w-full"
            sx={{
              marginBottom: "2.25rem",
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
            }}
            id="standard-basic0"
            label="Email"
            variant="standard"
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <TextField
            onChange={(e) =>
              setUserdata({ ...userData, password: e.target.value })
            }
            className="w-full text-white outline-white"
            id="standard-basic1"
            sx={{
              marginBottom: "2.25rem",
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
            }}
            label="Password"
            variant="standard"
            type="password"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <button
            onClick={handleLogin}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-white transition-all duration-500 ease-in-out"
          >
            Log-In
          </button>
          <p className="my-2">
            Don't Have an account{" "}
            <Link to={"/register"} className="underline text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={2000} position="top-center" />
    </>
  );
};

export default Login;
