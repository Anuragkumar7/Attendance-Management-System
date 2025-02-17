import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validRoles = ["PROFESSOR", "USER"];

  const validateRole = (role) => {
    return validRoles.includes(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        const userRole = data.role;
        const studentId = data.studentId;
        const name = data.userName;

        if (studentId) {
          localStorage.setItem("studentId", studentId);
          localStorage.setItem("role", userRole);
          localStorage.setItem("userName", name);
        }

        if (validateRole(userRole)) {
          navigate(userRole === "PROFESSOR" ? "/attendance" : "/dashboard");
        } else {
          setError("Unknown role. Please contact support.");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login error. Please try again.");
    }
  };

  return (
    <div>
      {/* Logo Section */}
      <div className="position-absolute top-0 start-0 m-3">
        <img
          src="./logo.png"
          alt="Logo"
          className="img-fluid"
          style={{ height: "80px", width: "100%" }}
        />
      </div>

      {/* Login Form */}
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
          style={{ width: "80%", maxWidth: "900px", overflow: "hidden" }}
        >
          {/* Left Section - Image */}
          <div
            className="d-flex align-items-center justify-content-center p-4"
            style={{ flex: 1, backgroundColor: "#243142" }}
          >
            <img
              src="./profe.png"
              alt="Professor Illustration"
              className="img-fluid"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </div>

          {/* Right Section - Form */}
          <div
            className="d-flex flex-column justify-content-center p-4"
            style={{ flex: 1 }}
          >
            <h2 className="text-center mb-4" style={{ color: "#1E3D59" }}>
              Login
            </h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Email"
                  style={{ borderRadius: "20px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

              <div className="text-center d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2"
                  style={{
                    marginTop: "20px",
                    borderRadius: "20px",
                    backgroundColor: "#1E3D59",
                    borderColor: "#1E3D59",
                  }}
                >
                  Login
                </button>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-success px-4 py-2"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#28a745",
                      borderColor: "#28a745",
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  style={{ color: "#1E3D59" }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign Up Button */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
