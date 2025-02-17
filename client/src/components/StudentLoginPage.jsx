import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StudentLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>

      <div className="position-absolute top-0 start-0 m-3">
        <img
          src="./logo.png"
          alt="Logo"
          className="img-fluid"
          style={{
            height: "80px",
            width: "100%",
          }}
        />
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#E6F0FA",
          padding: "20px",
        }}
      >
        <div
          className="d-flex bg-white shadow rounded"
          style={{
            width: "80%",
            maxWidth: "900px",
            overflow: "hidden",
          }}
        >
          {/* Left Section - Image */}
          <div
            className="d-flex align-items-center justify-content-center p-4"
            style={{
              flex: 1,
              backgroundColor: "#243142",
            }}
          >
            <img
              src="./student.png" // Replace with your image path
              alt="Student Illustration"
              className="img-fluid"
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
              }}
            />
          </div>

          {/* Right Section - Form */}
          <div
            className="d-flex flex-column justify-content-center p-4"
            style={{
              flex: 1,
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "#1E3D59" }}>
              Student's Login
            </h2>

            <form>
              <div className="mb-3">
                <label htmlFor="prn" className="form-label">
                  PRN No.
                </label>
                <input
                  type="text"
                  id="prn"
                  className="form-control"
                  placeholder="Enter PRN Number"
                  style={{ borderRadius: "20px" }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                  style={{ borderRadius: "20px" }}
                />
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPassword"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                    Show Password
                  </label>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#1E3D59",
                    borderColor: "#1E3D59",
                  }}
                >
                  Login
                </button>
              </div>

              <div className="text-center mt-3">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#1E3D59" }}
                >
                  Forget Password
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
