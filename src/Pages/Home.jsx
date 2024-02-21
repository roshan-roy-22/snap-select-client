import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { getAllvendors, userinfoAPI } from "../Services/allAPI";
import { ToastContainer } from "react-toastify";
import HomeCard from "../Components/HomeCard";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const dispatch = useDispatch();
  const getVendors = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const response = await getAllvendors(reqHeader);
        if(response.status)
      {
        dispatch(hideLoading())
        console.log(response.data);
        setVendors(response.data.data)
      }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(vendors);
  useEffect(() => {
    getVendors();
  }, []);
  

  return (
    <div div className="bg-[#F8F9FA]">
      <Navbar />

      <div className="my-8 px-5 ">
        <h1 className="text-4xl my-2 font-medium text-center">
          Peruse the vendor offering their services.
        </h1>
        <div className="flex justify-between flex-wrap">
        {vendors.map((vendor, index) => (
            <HomeCard key={index} vendor={vendor} />
          ))}
        </div>
      </div>

      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
};

export default Home;
