import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import { viewVendorAPI } from "../Services/allAPI";
import { SERVER_URL } from "../Services/serverURL";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PlaceIcon from "@mui/icons-material/Place";
const ViewVendor = () => {
  const [vendors, setVendors] = useState({});

  const { photographer_id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getVendor = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
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

  return (
    <>
      <Navbar />
      <div>
        <div className="px-5">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVendor;
