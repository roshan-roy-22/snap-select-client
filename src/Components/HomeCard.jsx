import React, { useState } from "react";
import PlaceIcon from '@mui/icons-material/Place';
import { SERVER_URL } from "../Services/serverURL";
import { useNavigate } from "react-router-dom";


const HomeCard = ({vendor}) => {
    const navigate=useNavigate();
    console.log(vendor);
    console.log(vendor.coverImage[0].filename);
   
  return (
    <>
      <div class="relative mx-auto my-9 flex w-80 flex-col rounded-xl  border-1 bg-clip-border text-gray-700 shadow-xl">
        <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg ">
          <img
            src={`${SERVER_URL}/uploads/${vendor.coverImage[0].filename}`}
            alt=""
          />
        </div>
        <div class="p-6">
          <h1 className="text-2xl mb-1 font-medium">{vendor.name}</h1>
         <div className="items-center justify-center">
           <PlaceIcon/>
           <span className="text-gray-400">{vendor.city},{vendor.state}</span>
         </div>
          <button onClick={()=>navigate(`/view-vendor/${vendor._id}`)} className="py-2 mt-5 my-1 px-4 border-2 border-[#00A8E8] text-white w-full bg-[#00A8E8] hover:bg-white hover:text-[#00A8E8] transition-all  rounded-lg">View Studio</button>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
