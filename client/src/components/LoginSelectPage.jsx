import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome for icons
import { Link } from "react-router-dom";

export default function LoginSelectPage() {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center position-relative">
      {/* Logo Section */}
      <div className="position-absolute top-0 start-0 m-3">
        <img
          src="./logo.png"
          alt="Logo"
          className="img-fluid"
          style={{ height: "0px", width: "100%" }}
        />
      </div>

      {/* Yellow and White Circle */}
      <div
        className="position-absolute"
        style={{
          top: "20px",
          right: "20px",
          width: "80px",
          height: "80px",
          backgroundColor: "#FFC107",
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
        <div
          className="position-absolute"
          style={{
            top: "20px",
            left: "20px",
            width: "40px",
            height: "40px",
            backgroundColor: "#FFF",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section: Login Buttons */}
          <div className="col-md-6 d-flex flex-column align-items-start gap-3">
            <h1 className="mb-4">Select To Login</h1>
            <Link to="/login">
              <button
                className="btn btn-light btn-lg"
                style={{ padding: "10px 58px" }}
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                className="btn btn-light btn-lg"
                style={{ padding: "10px 48px" }}
              >
                Sign up
              </button>
            </Link>
          </div>

          {/* Right Section: Image */}
          <div className="col-md-6 text-end">
            <img
              src="./Start.png"
              alt="Robot Illustration"
              className="img-fluid"
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>
      </div>

      {/* Yellow and White Circle */}
      <div
        className="position-absolute"
        style={{
          bottom: "120px",
          left: "450px",
          width: "80px",
          height: "80px",
          backgroundColor: "#FFC107",
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
        <div
          className="position-absolute"
          style={{
            top: "20px",
            left: "20px",
            width: "40px",
            height: "40px",
            backgroundColor: "#FFF",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      {/* Footer Section */}
      <div className="position-absolute bottom-0 mb-4 text-center w-100">
        <span className="me-3">Social Media:</span>
        <a
          href="https://facebook.com"
          className="text-white me-3 social-icon text-decoration-none"
        >
          <i className="fab fa-facebook fa-lg"></i>
        </a>
        <a
          href="https://instagram.com"
          className="text-white me-3 social-icon text-decoration-none"
        >
          <i className="fab fa-instagram fa-lg"></i>
        </a>
        <a
          href="https://twitter.com"
          className="text-white me-3 social-icon text-decoration-none"
        >
          <i className="fab fa-twitter fa-lg"></i>
        </a>
        <a
          href="https://youtube.com"
          className="text-white social-icon text-decoration-none"
        >
          <i className="fab fa-youtube fa-lg"></i>
        </a>
      </div>

      {/* Bootstrap CSS for Hover Effect */}
      <style>
        {`
          .social-icon:hover {
            color:rgb(255, 69, 7) !important; /* Bootstrap hover effect */
          }
        `}
      </style>
    </div>
  );
}
