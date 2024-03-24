import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { changeBookingStatusAPI, vendorBookingsAPI } from "../Services/allAPI";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import { ToastContainer, toast } from "react-toastify";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const VendorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const [bookingsData,SetBookingData]=useState(null)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (data) =>{
    setOpen(true);
    SetBookingData(data)
    // console.log(data);
  }
  const handleClose = () => {
    setOpen(false);
    console.log(bookingsData);
    
  }


  const vendorBookings = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
      if (token) {
        console.log(token);
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const response = await vendorBookingsAPI(reqHeader);
        dispatch(hideLoading());
        if (response.data.success) {
          //   alert("Fetched the data");
          console.log(response.data.data);
          setBookings(response.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeBookingStatus = async (item, status) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        console.log(token);
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const reqBody = {
          bookingId: item._id,
          status: status,
        };

        const response = await changeBookingStatusAPI(reqBody, reqHeader);
        dispatch(hideLoading());
        if (response.data.success) {
          toast.info(response.data.message);
          vendorBookings();
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    vendorBookings();
  }, []);

  return (
    <div  className="bg-[#F8F9FA] ">
      <Navbar />
      <div className="grid grid-cols-6 max-md:px-4 h-[60vh]">
        <div></div>
        <div className="col-span-4 max-md:col-span-6">
          <h1 className="text-3xl m-3 font-semibold">Bookings</h1>
          <TableContainer component={Paper}>
            <Table className="w-full">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow>
                  <TableCell>Sl.no</TableCell>
                  <TableCell>Custumer Name</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings?.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.userInfo.username}</TableCell>
                    <TableCell onClick={()=>handleOpen(item.bookingInfo)} className="cursor-pointer"><InfoOutlinedIcon/>View Details</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-3 items-center">
                        {item.status === "pending" && (
                          <div className="flex">
                            {" "}
                            <h1
                              className=" px-2"
                              onClick={() =>
                                changeBookingStatus(item, "approved")
                              }
                            >
                              Approve
                            </h1>
                            <h1
                              className=""
                              onClick={() =>
                                changeBookingStatus(item, "rejected")
                              }
                            >
                              Reject
                            </h1>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div></div>
      </div>
      <ToastContainer autoClose={2000} position="top-center" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <h1 className="text-center text-2xl mb-2 font-bold text-blue-500">Booking Details</h1>
         <h2 className="mb-3">Customer Name:{bookingsData?.name}</h2>
         <h2 className="mb-3">{bookingsData?.phoneNumber}</h2>
         <h2 className="mb-3">Date: {bookingsData?.date ? new Date(bookingsData.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' }) : ''}</h2>
         <h2 className="mb-3">City:{bookingsData?.city}</h2>
         <h2 className="mb-3">State:{bookingsData?.state}</h2>
         <h2 className="mb-3">Message:{bookingsData?.message}</h2>
        </Box>
      </Modal>
    </div>
  );
};

export default VendorBookings;
