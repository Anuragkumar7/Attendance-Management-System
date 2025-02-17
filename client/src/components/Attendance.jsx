import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [attendance, setAttendance] = useState({});
  const [submittedAttendance, setSubmittedAttendance] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Current date
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Get userName from localStorage
  const userName = localStorage.getItem("userName");

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/categories"
        );
        setCategories(["All", ...response.data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/students");
        const filteredStudents = response.data.filter(
          (student) => student.role === "USER"
        );
        setStudents(filteredStudents);
        setFilteredStudents(filteredStudents);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Fetch submitted attendance for the selected date
  useEffect(() => {
    const fetchSubmittedAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/attendance?date=${attendanceDate}`
        );
        const submittedData = response.data.reduce((acc, record) => {
          acc[record.studentId] = record.status;
          return acc;
        }, {});
        setSubmittedAttendance(submittedData);
      } catch (err) {
        console.error("Error fetching submitted attendance:", err);
      }
    };

    fetchSubmittedAttendance();
  }, [attendanceDate]);

  // Filter students by selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredStudents([]);
    } else {
      const filtered = students.filter(
        (student) => student.category?.name === selectedCategory
      );
      setFilteredStudents(filtered);
    }
  }, [selectedCategory, students]);

  // Handle attendance selection
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = async () => {
    if (selectedCategory === "All") {
      setMessage("Please select a category before submitting attendance.");
      return;
    }

    const attendanceData = filteredStudents.map((student) => ({
      studentId: student.id,
      status: attendance[student.id] || "Absent",
      date: attendanceDate, // Ensure the format is YYYY-MM-DD
    }));

    console.log("Submitting attendance:", attendanceData); // Debugging log

    try {
      const response = await axios.post(
        "http://localhost:8082/api/attendance",
        attendanceData,
        {
          headers: { "Content-Type": "application/json" }, // Ensure JSON format
        }
      );

      console.log("Response:", response.data); // Debugging log
      setMessage("Attendance submitted successfully!");
      setSubmittedAttendance((prev) => ({ ...prev, ...attendance }));
    } catch (err) {
      console.error(
        "Error submitting attendance:",
        err.response?.data || err.message
      );
      setError(err.response?.data || "Failed to submit attendance.");
    }
  };

  if (loading) return <p className="text-center">Loading students...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container-fluid">
      {/* Pass userName as prop to Navbar */}
      <Navbar userName={userName} />

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h2 className="mb-3">Mark Attendance</h2>

          {/* Success / Error Message */}
          {message && (
            <p
              className={
                message.includes("success") ? "text-success" : "text-danger"
              }
            >
              {message}
            </p>
          )}

          {/* Attendance Date Selector */}
          <div className="mb-3">
            <label className="form-label fw-bold">Attendance Date:</label>
            <input
              type="date"
              className="form-control"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              disabled
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="mb-3">
            <label className="form-label fw-bold">Filter by Category:</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Students Table */}
          {selectedCategory !== "All" && filteredStudents.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>PRN</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Father's Name</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Category</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.prn}</td>
                      <td>{student.name}</td>
                      <td>{student.gender}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.dob}</td>
                      <td>{student.email}</td>
                      <td>{student.category?.name || "N/A"}</td>
                      <td>
                        <select
                          className="form-select"
                          value={
                            submittedAttendance[student.id] ||
                            attendance[student.id] ||
                            ""
                          }
                          onChange={(e) =>
                            handleAttendanceChange(student.id, e.target.value)
                          }
                          disabled={
                            selectedCategory === "All" ||
                            submittedAttendance[student.id] !== undefined
                          }
                        >
                          <option value="">Select</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Half-day">Half-day</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-warning">
              Please select a category to display students.
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={submitAttendance}
            className="btn btn-success mt-3"
            disabled={selectedCategory === "All"} // Disable if no category selected
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
