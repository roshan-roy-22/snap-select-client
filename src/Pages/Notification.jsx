import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import { toast } from "react-toastify";
import { deleteNotificationAPI, markNotificationAPI } from "../Services/allAPI";
import { setUser } from "../Redux/userSlice";
import { ToastContainer } from "react-toastify";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {}, []);

  console.log(user);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const markallRead = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");

      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        dispatch(showLoading());
        const result = await markNotificationAPI(reqHeader);
        if (result.data.success) {
          dispatch(hideLoading());
          toast.success(result.data.message);
          dispatch(setUser(result.data.data));
        } else {
          toast.error("Something Wrong");
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteNotification =async()=>{
    try {
        dispatch(showLoading());
        const token = localStorage.getItem("token");
  
        if (token) {
          const reqHeader = {
            Authorization: `Bearer ${token}`,
          };
          dispatch(showLoading());
          const result = await deleteNotificationAPI(reqHeader);
          if (result.data.success) {
            dispatch(hideLoading());
            toast.success(result.data.message);
            dispatch(setUser(result.data.data));
          } else {
            toast.error("Something Wrong");
          }
        }
      } catch (error) {
        dispatch(hideLoading());
        toast.error("Something went wrong");
      }
    };
  

  return (
    <div className="bg-[#F8F9FA]">
      <Navbar />
      <div className="h-[90vh]">
        <div className="grid grid-cols-4 mt-3  ">
          <div></div>
          <div className="col-span-2 bg-white px-3 rounded-md shadow-xl ">
            <h1 className="text-3xl text-blue-500 font-medium m-4">
              Notification
            </h1>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Unseen" {...a11yProps(0)} />
                  <Tab label="Seen" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div onClick={() => markallRead()} className="flex justify-end">
                  Mark all as seen
                </div>
                {user?.unseenNotification.map((notification) => (
                  <div
                    onClick={() => navigate(notification.onClickPath)}
                    className="p-2 cursor-pointer "
                  >
                    <div className=" mb-2">{notification.message}</div>
                    <Divider />
                  </div>
                ))}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div onClick={()=>deleteNotification()} className="flex justify-end">Delete all notification</div>
                {user?.seenNotifation.map((notification)=>(
                  <div
                  onClick={() => navigate(notification.onClickPath)}
                  className="p-2 cursor-pointer "
                >
                  <div className=" mb-2">{notification.message}</div>
                  <Divider />
                </div>
                ))}
              </CustomTabPanel>
            </Box>
          </div>
          <div></div>
        </div>
      </div>
      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
};

export default Notification;
