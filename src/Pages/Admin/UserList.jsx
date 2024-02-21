import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import { getAlluserAPI } from "../../Services/allAPI";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        dispatch(showLoading());
        const result = await getAlluserAPI(reqHeader);
        if (result.data.success) {
          dispatch(hideLoading());
          setUserData(result.data.data);
        }
      }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    
  }, []);
  console.log(userData);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-6">
        <div></div>
        <div className="col-span-4">
            <h1 className="text-3xl font-medium m-3">User list</h1>
            <TableContainer component={Paper}>
                <Table  className="w-full">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sl.no</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData?.map((item,index)=>(
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.createdAt.slice(0,10)}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell  className="cursor-pointer underline" >Block</TableCell>
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

export default UserList;
