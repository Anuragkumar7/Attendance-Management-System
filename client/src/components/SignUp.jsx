import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [prn, setPrn] = useState("");
  const [gender, setGender] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8082/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          prn,
          gender,
          fatherName,
          dob,
          email,
          password,
          role,
          category: { id: category }, // Send category as an object
        }),
        credentials: "include",
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      console.log("Response Data:", data);

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
          <div
            className="d-flex flex-column justify-content-center p-4"
            style={{ flex: 1 }}
          >
            <h2 className="text-center mb-4" style={{ color: "#1E3D59" }}>
              Signup
            </h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="PRN"
                value={prn}
                onChange={(e) => setPrn(e.target.value)}
                required
              />
              <select
                className="form-control mb-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="date"
                className="form-control mb-2"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <select
                className="form-control mb-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                className="form-control mb-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="USER">User</option>
                <option value="PROFESSOR">Professor</option>
              </select>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label">Show Password</label>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
