import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for redirect
  const [userRoleState, setUserRoleState] = useState(userRole);

  useEffect(() => {
    setUserRoleState(localStorage.getItem("role")); // Update userRole if it changes
  }, [userRole]);

  // Define the menu links based on roles
  const menuItems = {
    USER: [{ path: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" }],
    PROFESSOR: [
      {
        path: "/student-management",
        icon: "bi-clipboard-data",
        label: "Student Management",
      },
      { path: "/attendance", icon: "bi-calendar-check", label: "Attendance" },
    ],
    // You can define more roles here
  };

  // Select the menu based on the user's role
  const userMenu = menuItems[userRoleState] || menuItems["USER"];

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/logout", { method: "POST", credentials: "include" });

      // Clear localStorage
      localStorage.removeItem("studentId");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className={`bg-dark text-white d-flex flex-column`}
      style={{
        height: "200vh",
        width: collapsed ? "50px" : "250px",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Sidebar toggle button */}
      <button
        className="btn btn-dark w-100 text-start d-md-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        <i
          className={`bi ${collapsed ? "bi-list" : "bi-x"}`}
          style={{ fontSize: "1.5rem" }}
        ></i>
      </button>

      <div className="p-3 flex-grow-1">
        {/* Show company logo if not collapsed */}
        {!collapsed && <h4 className="text-white mb-4">Company Logo</h4>}

        <nav className="nav flex-column">
          {/* Render links based on user role */}
          {userMenu.map((item, index) => (
            <Link
              key={index}
              className="nav-link text-white sidebar-link d-flex align-items-center"
              to={item.path}
            >
              <i className={`bi ${item.icon}`}></i>
              {!collapsed && <span className="ms-2">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Apply Leave button */}
        <div className="p-3 mt-auto">
          <button className="btn btn-warning w-100 d-flex align-items-center justify-content-center">
            <i className="bi bi-envelope-plus"></i>
            {!collapsed && (
              <a
                href="mailto:anurag.kum.135@gmail.com"
                className="ms-2"
                style={{ textDecoration: "none", color: "#000" }}
              >
                Apply Leave
              </a>
            )}
          </button>
        </div>

        {/* Logout button */}
        <div className="p-3 mt-2">
          <button
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            {!collapsed && <span className="ms-2">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
