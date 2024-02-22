import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import { bookAPI, viewVendorAPI } from "../Services/allAPI";
import { SERVER_URL } from "../Services/serverURL";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PlaceIcon from "@mui/icons-material/Place";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import '../index.css'
const ViewVendor = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [vendors, setVendors] = useState({});

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getVendor = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const reqBody = {
          photographer_id,
        };

        const response = await viewVendorAPI(reqBody, reqHeader);
        dispatch(hideLoading());
        if (response.data.success) {
          setVendors(response.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVendor();
  }, []);

  const bookVendor=async()=>{
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token")
      if(token){
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const reqBody={
          userId:user._id,
          photographerId:vendors._id,
          vendorInfo:vendors,
          userInfo:user
        }
        const response = await bookAPI(reqBody,reqHeader)
        dispatch(hideLoading())
        if(response.data.success){
          toast.success(response.data.message)
        }
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Error while booking")
      console.log(error);
    }
  }

  console.log(vendors);
  console.log(user);
  const { photographer_id } = useParams();



  return (
    <div  className="bg-[#F8F9FA]">
      <Navbar />
      <div >
        <div className="px-6">
          <div className="grid grid-cols-2 mt-7">
            <div>
              <div className=" w-10/12 mx-auto ">
                {vendors.coverImage && vendors.coverImage.length > 0 && (
                  <img
                    className="rounded-lg"
                    src={`${SERVER_URL}/uploads/${vendors.coverImage[0].filename}`}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-semibold">{vendors.name}</h1>
                <div className="flex gap-3">
                  <div className="flex items-center text-2xl">
                    <BusinessCenterIcon />
                    <span>{vendors.city}</span>
                  </div>
                  <div className="text-2xl flex items-center">
                    <PlaceIcon /> <span>{vendors.state}</span>
                  </div>
                </div>
                <p className="text-lg">{vendors.description}</p>
                <div>
                  <div>
                    <span className="text-xl font-medium">Expertise in</span>
                    {vendors.genres &&
                      vendors.genres.map((genre, index) => (
                        <button
                          className="bg-[#EBEBEB] shadow-md rounded-lg px-2 py-1 mx-2 my-1"
                          key={index}
                        >
                          {genre}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-container my-8">
            <Slider {...settings}>
              {vendors.photos &&
                vendors.photos.map((photo, index) => (
                  <div  className="h-[300px] w-[350px] space-x-3   object-fill mt-7">
                    <img className="object-contain mx-4"
                    key={index}
                    src={`${SERVER_URL}/uploads/${photo.filename}`}
                    alt=""
                  />
                  </div>
                ))}
            </Slider>
          </div>
          <div className="text-center" >
          <button className="my-7 book" onClick={bookVendor}  >Request Booking</button>
          </div>
        </div>
         
      </div>
      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
};

export default ViewVendor;
