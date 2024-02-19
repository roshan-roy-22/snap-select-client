import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../Redux/userSlice";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import { userinfoAPI } from "../Services/allAPI"; // Import userinfoAPI

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        dispatch(showLoading());
        const result = await userinfoAPI(reqHeader);
        dispatch(hideLoading());
        console.log(result.data.success);
        if (result.data.success) {
          console.log("hello ji");
          dispatch(setUser(result.data.data));
        } else {
            localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        dispatch(hideLoading());
        localStorage.clear();
        navigate("/login");
      }
    };

    getData();
  }, [dispatch, navigate]); // Update dependency array

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
