import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { userinfoAPI } from "../Services/allAPI";
import { ToastContainer } from "react-toastify";

const Home = () => {
 
  return (
    <div>
      <Navbar />
      <ToastContainer autoClose={2000} position="top-center" />
      
    </div>
  );
};

export default Home;
