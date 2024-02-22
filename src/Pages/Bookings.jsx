import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bookingsAPI } from "../Services/allAPI";
import Navbar from "../Components/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const bookingData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        console.log(token);
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const response = await bookingsAPI(reqHeader);
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

  useEffect(() => {
    bookingData();
  }, []);
  console.log(bookings);
  return (
    <div className="bg-[#F8F9FA] pb-5">
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
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings?.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.vendorInfo.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Bookings;
