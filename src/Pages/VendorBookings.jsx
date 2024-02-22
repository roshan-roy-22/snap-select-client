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

const VendorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
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
    <div  className="bg-[#F8F9FA] pb-7">
      <Navbar />
      <div className="grid grid-cols-6 h-[90vh]">
        <div></div>
        <div className="col-span-4">
          <h1 className="text-3xl m-3 font-semibold">Bookings</h1>
          <TableContainer component={Paper}>
            <Table className="w-full">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow>
                  <TableCell>Sl.no</TableCell>
                  <TableCell>Custumer Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings?.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.userInfo.username}</TableCell>
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
    </div>
  );
};

export default VendorBookings;
