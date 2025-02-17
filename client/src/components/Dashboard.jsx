import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AttendanceStats from "./AttendanceStats";
import CalendarGrid from "./CalendarGrid";
import AttendanceSection from "./AttendanceSection";
import axios from "axios";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve studentId from localStorage, defaulting to "1" for testing
  const studentId = localStorage.getItem("studentId") ;
  const role = localStorage.getItem("role");
  // Fetch student data using studentId
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/attendance/student/${studentId}`
        );
        // Ensure response contains student and attendance data
        if (response.data.student && response.data.attendance) {
          setStudent(response.data.student);
          setAttendance(response.data.attendance);
        } else {
          throw new Error("Invalid response structure.");
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load student information.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date and time for display
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  // Handle loading and error states
  if (loading) return <p>Loading student data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  // Calculate Total Present Days
  const totalPresentDays = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
          <Navbar userName={student?.name || "Student"} />
        <div className="col-md-3 col-lg-2 p-0 text-white">
          <Sidebar  userRole={role}/>
        </div>

        {/* Main Dashboard Content */}
        <div className="col-md-9 col-lg-10 p-4 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
            <div className="d-flex align-items-center gap-3 ms-auto">
              <div className="text-end">
                <span className="d-block h5 mb-0 text-dark fw-bold">
                  {formatDate(currentTime).split(",")[0]}
                </span>
                <small className="text-muted">{`${
                  formatDate(currentTime).split(",")[1]
                }, ${formatTime(currentTime)}`}</small>
              </div>
            </div>
          </div>

          {/* Attendance Stats */}
          <AttendanceStats attendanceData={attendance} />

          {/* Calendar Section */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <CalendarGrid attendanceData={attendance} />
            </div>
          </div>

          {/* Attendance Section */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3 fw-bold">Your Attendance Records</h5>
              <AttendanceSection attendanceData={attendance} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
