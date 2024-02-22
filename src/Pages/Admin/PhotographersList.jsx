import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useDispatch } from "react-redux";
import {
  changeAccountStatusAPI,
  getAllphotographerAPI,
} from "../../Services/allAPI";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CollectionsIcon from '@mui/icons-material/Collections';
import Modal from '@mui/material/Modal';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { SERVER_URL } from "../../Services/serverURL";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height:450,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
};


const PhotographersList = () => {

  const [itemData,setItemdata]=useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    console.log(item.photos);
    setItemdata(item.photos)
    console.log(item);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  const getUserData = async () => {
    console.log(userData);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        dispatch(showLoading());
        const result = await getAllphotographerAPI(reqHeader);
        if (result.data.success) {
          dispatch(hideLoading());
          setUserData(result.data.data);
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const changeAccountStatus = async (item, status) => {
    console.log(item);
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const reqBody = {
          photographerId: item._id,
          status,
        };
        dispatch(showLoading());
        const response = await changeAccountStatusAPI(reqBody, reqHeader);
        console.log(response);
        dispatch(hideLoading());

        // Check if response is defined and has data property
        if (response && response.data && response.data.success) {
          alert(response.data.message);
          getUserData();
        } else {
          // Handle error scenario where response or response.data is undefined
          alert("Error in changing photographer account status");
        }
      }
    } catch (error) {
      alert("Error in changing photographer account status");
      console.log(error);
      dispatch(hideLoading());
    }
  };

  console.log(userData);
  return (
    <div  className="bg-[#F8F9FA] pb-6">
      <Navbar />
      <div className="grid grid-cols-6 h-[90vh]">
        <div></div>
        <div className="col-span-4">
          <h1 className="text-3xl font-medium m-3">Vendor's list</h1>
          <TableContainer component={Paper}>
            <Table className="w-full">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow>
                  <TableCell>Sl.no</TableCell>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Photos</TableCell>
                  <TableCell>Created at</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell >
                      <div onClick={()=>handleOpen(item)} className="cursor-pointer">
                        <CollectionsIcon/> View Photos
                      </div>
                    </TableCell>
                    <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="cursor-pointer underline">
                      {item.status === "pending" && (
                        <h1
                          className="anchor"
                          onClick={() => changeAccountStatus(item, "approved")}
                        >
                          Approve
                        </h1>
                      )}
                      {item.status === "approved" && (
                        <h1
                          className="anchor"
                          onClick={() => changeAccountStatus(item, "blocked")}
                        >
                          Block
                        </h1>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
        <Modal
        // sx={style}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
       <ImageList sx={style} cols={3} rowHeight={164}>
  {itemData.map((photo, index) => (
    <ImageListItem key={index}>
      <img className="object-fill" src={`${SERVER_URL}/uploads/${photo.filename}`} alt={photo.originalname} />
    </ImageListItem>
  ))}
</ImageList>

       
      </Modal>
        </div>
      </div>
    </div>
  );
};

export default PhotographersList;
