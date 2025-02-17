import React from "react";

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      <span className="navbar-brand mb-0 h4 fw-bold">Dashboard</span>
      <div className="d-flex align-items-center">
        <span className="me-3 fw-bold text-dark">Welcome, {userName}</span>
        <a href="/profile" className="btn btn-outline-primary">
          Profile
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
