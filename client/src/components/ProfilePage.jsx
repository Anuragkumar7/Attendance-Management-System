import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa"; // Added Back Arrow Icon
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { useNavigate } from "react-router-dom"; // Import useHistory

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const studentId = localStorage.getItem("studentId") || "1";
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/students/${studentId}`
        );
        setUser(response.data);
        setEditedUser(response.data);
      } catch (err) {
        setError("Failed to load student information.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8082/api/students/${studentId}`,
        editedUser
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update student information.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!user || !editedUser) return <p>No user data found.</p>;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 rounded text-white"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          width: "100%", // Full width of the screen
          maxWidth: "100vw", // Limit the maximum width to the full viewport width
          boxSizing: "border-box", // Ensure padding doesn't overflow
          padding: "20px", // Adjust padding for smaller screens
          position: "relative", // Make the container for positioning the button
        }}
      >
        {/* Back Button */}
        <button
          className="btn btn-light text-dark mb-3"
          onClick={handleBack} // Call the back function on click
          style={{
            position: "absolute", // Position the button absolutely within the card
            top: "10px", // Place the button at the top
            left: "10px", // Place the button at the left corner
          }}
        >
          <FaArrowLeft className="me-1" /> Back
        </button>

        {/* Profile Picture */}
        <div className="text-center">
          <img
            src={
              user.image ||
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="Profile"
            className="rounded-circle shadow"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "4px solid #fff",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>

        <h2 className="text-center fw-bold mt-3">
          {isEditing ? (
            <input
              type="text"
              className="form-control text-center"
              name="name"
              value={editedUser.name || ""}
              onChange={handleChange}
            />
          ) : (
            <span>{user.name || "N/A"}</span>
          )}
        </h2>

        {/* PRN & Category */}
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label className="fw-bold">PRN</label>
            <p className="form-control bg-light">{user.prn || "N/A"}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-bold">Category</label>
            <p>
              <span className="badge bg-warning text-dark px-3 py-2">
                {user.category?.name || "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Gender & DOB */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="fw-bold">Gender</label>
            <p className="form-control bg-light">{user.gender || "N/A"}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-bold">Date of Birth</label>
            <p className="form-control bg-light">{user.dob || "N/A"}</p>
          </div>
        </div>

        {/* Father's Name & Email */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="fw-bold">Father's Name</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="fatherName"
                value={editedUser.fatherName || ""}
                onChange={handleChange}
              />
            ) : (
              <p className="form-control bg-light">
                {user.fatherName || "N/A"}
              </p>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-bold">Email</label>
            {isEditing ? (
              <input
                type="email"
                className="form-control"
                name="email"
                value={editedUser.email || ""}
                onChange={handleChange}
              />
            ) : (
              <p className="form-control bg-light">{user.email || "N/A"}</p>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mb-3">
          <label className="fw-bold">Resume</label>
          <p>
            {user.resume ? (
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                View Resume
              </a>
            ) : (
              "Not Uploaded"
            )}
          </p>
        </div>

        {/* Edit / Save Buttons */}
        <div className="mt-4 text-center">
          {isEditing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>
                <FaSave className="me-1" /> Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                <FaTimes className="me-1" /> Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-light text-dark"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit className="me-1" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
