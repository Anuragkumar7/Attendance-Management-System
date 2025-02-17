import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import StudentManagement from "./components/StudentManagement";
import Attendance from "./components/Attendance";
import LoginSelectPage from "./components/LoginSelectPage";
import ProfilePage from "./components/ProfilePage";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginSelectPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["USER"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student-management"
            element={
              <PrivateRoute roles={["PROFESSOR"]}>
                <StudentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <PrivateRoute roles={["PROFESSOR"]}>
                <Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute roles={["USER"]}>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
