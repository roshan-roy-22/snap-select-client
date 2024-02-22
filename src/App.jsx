import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import "../src/index.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import ApplyPhotographer from "./Pages/ApplyPhotographer";
import Notification from "./Pages/Notification";
import UserList from "./Pages/Admin/UserList";
import PhotographersList from "./Pages/Admin/PhotographersList";
import Profile from "./Pages/Photographers/Profile";
import ViewVendor from "./Pages/ViewVendor";
import Bookings from "./Pages/Bookings";
import VendorBookings from "./Pages/VendorBookings";
import Footer from "./Components/Footer";
import Landing from "./Pages/Landing";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      {loading && (
        <div className="spinner-parent">
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/home" element={<PublicRoute>
          <Landing/>
        </PublicRoute>} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
              <Footer/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-photographer"
          element={
            <ProtectedRoute>
              <ApplyPhotographer />
              <Footer/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notification/>
              <Footer/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-userlist"
          element={
            <ProtectedRoute>
              <UserList/>
              <Footer/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-photographerlist"
          element={
            <ProtectedRoute>
              <PhotographersList/>
              <Footer/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile/>
              <Footer/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/view-vendor/:photographer_id"
          element={
            <ProtectedRoute>
              <ViewVendor/>
              <Footer/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings/>
              <Footer/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/bookings"
          element={
            <ProtectedRoute>
              <VendorBookings/>
              <Footer/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
