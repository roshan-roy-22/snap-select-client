import React from "react";
import logo from "../assets/images/logo-icon.png";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge } from "@mui/material";
// import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbar = () => {
  const navigate=useNavigate();
  const {user} = useSelector(state=>state.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userMenu =[
    {
      name:'Home',
      path:'/'
    },
    {
      name:'Bookings',
      path:'/bookings'
    },
    {
      name:'Apply Vendor',
      path:'/apply-photographer'
    },
  ]

  const vendorMenu=[
    {
      name:'Home',
      path:'/'
    },
    {
      name:'Bookings',
      path:'/bookings'
    },
    {
      name:'Profile',
      path:`/profile/${user?._id}`
    },
  ]

  const adminMenu =[
    {
      name:'Home',
      path:'/'
    },
    {
      name:'Users',
      path:'/admin-userlist'
    },
    {
      name:'Photographers',
      path:'/admin-photographerlist'
    },
  ]

  const menuTobeRendered =user?.isAdmin ? adminMenu: user?.isVendor ? vendorMenu :userMenu
// console.log(user);
  return (
    <>
      <div className="flex justify-between items-center py-4 px-10 border-b-2 bg-white">
        <a className="flex items-center">
          <img width={"45px"} src={logo} alt="" />{" "}
          <span className="font-bold text-xl">SNAP SELECT</span>
        </a>
        <div className="flex items-center gap-8">
          <div className="cursor-pointer" onClick={()=>navigate('/notifications')}>
            <Badge  badgeContent={user?.unseenNotification.length} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </div>
          <div>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {user?.username}
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {
                  menuTobeRendered.map((menu,index)=>(
                <MenuItem key={index} onClick={handleClose}><Link to={menu.path}>{menu.name}</Link></MenuItem>
                  ))
                }
                <MenuItem onClick={()=>{
                  localStorage.clear();
                  navigate('/login')
                }}>Logout</MenuItem>
              </Menu>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
