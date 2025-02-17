import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [prn, setPrn] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8082/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, prn }),
        credentials: "include",
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      console.log(data);

      if (response.ok && data.success) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Signup failed. Please check your details and try again.");
    }
  };

  return (
    <div>
      <div className="position-absolute top-0 start-0 m-3">
        <img
          src="./logo.png"
          alt="Logo"
          className="img-fluid"
          style={{ height: "80px", width: "100%" }}
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
          style={{ width: "80%", maxWidth: "900px", overflow: "hidden" }}
        >
          {/* Left Section - Image */}
          <div
            className="d-flex align-items-center justify-content-center p-4"
            style={{ flex: 1, backgroundColor: "#243142" }}
          >
            <img
              src="./Signing.png"
              alt="Signup Illustration"
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
              Signup
            </h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label className="form-check-label">Show Password</label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">PRN</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter PRN"
                  value={prn}
                  onChange={(e) => setPrn(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="USER">User</option>
                  <option value="PROFESSOR">Professor</option>
                </select>
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
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
