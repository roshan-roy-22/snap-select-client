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
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-photographer"
          element={
            <ProtectedRoute>
              <ApplyPhotographer />
            </ProtectedRoute>
          }
        />
         <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notification/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-userlist"
          element={
            <ProtectedRoute>
              <UserList/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-photographerlist"
          element={
            <ProtectedRoute>
              <PhotographersList/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/view-vendor/:photographer_id"
          element={
            <ProtectedRoute>
              <ViewVendor/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
