import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-blacl.png";
import registerbg from "../assets/images/registerbg.jpg";
import { registerAPI } from "../Services/allAPI";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";


const Register = () => {
 
  const dispatch = useDispatch();
  const [userData, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
  });
const navigate=useNavigate('/');
  const handleRegister = async () => {
    console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.info("Please Enter the input field");
    } else {
      try {
        dispatch(showLoading())
        const result = await registerAPI(userData);
        dispatch(hideLoading())
        console.log(result);
        if (result.status === 200) {
          toast.success(`${result.data.username} has registered successfully`);
          setUserdata({ username: "", email: "", password: "" });
          navigate('/login')
        } else {
          toast.error(result.response.data);
          setUserdata({ email: "", password: "" });
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        position: "relative", // Make the container relative for absolute positioning of the overlay
        backgroundImage: `url(${registerbg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="grid lg:grid-cols-2 h-screen"
    >
      {/* Overlay for black shade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black with 50% opacity
          zIndex: 0, // Ensure the overlay is behind other content
        }}
      ></div>

      <div className="col-span-1"></div>
      <div className="col-span-1 py-8 relative">
        <div
          className="bg-white mx-auto max-[360px]:w-4/5 w-3/4 p-7 flex flex-col items-center rounded-md"
          style={{ zIndex: 1 }}
        >
          <img
            style={{ height: "8rem", width: "10rem" }}
            className=""
            src={logo}
            alt=""
          />
          <h1 className="text-3xl max-[360px]:text-xl max-sm:text-2xl font-medium mb-3">
            Welcome to <span className="text-blue-500">SnapSelect</span>
          </h1>
          <p className="text-gray-600 mb-3 max-[360px]:text-xs">
            Register for a new account and explore the vision
          </p>
          <TextField
            className="w-full"
            sx={{ marginBottom: "2.25rem" }}
            id="standard-basic1"
            label="Name"
            variant="standard"
            onChange={(e) =>
              setUserdata({ ...userData, username: e.target.value })
            }
          />
          <TextField
            type="email"
            className="w-full"
            sx={{ marginBottom: "2.25rem" }}
            id="standard-basic2"
            label="Email"
            variant="standard"
            onChange={(e) =>
              setUserdata({ ...userData, email: e.target.value })
            }
          />
          <TextField
            className="w-full"
            id="standard-basic3"
            sx={{ marginBottom: "2.25rem" }}
            label="Password"
            variant="standard"
            type="password"
            onChange={(e) =>
              setUserdata({ ...userData, password: e.target.value })
            }
          />

          <button
            onClick={handleRegister}
            className="my-3 w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-white transition-all duration-500 ease-in-out"
          >
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="underline text-blue-400">
              Log in
            </Link>{" "}
          </p>
        </div>
      </div>
      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
};

export default Register;
