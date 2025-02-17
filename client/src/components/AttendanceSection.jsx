import React from "react";

const AttendanceSection = ({ attendanceData }) => {
  const calculateAttendance = (attendanceData) => {
    if (!attendanceData || Object.keys(attendanceData).length === 0) {
      return { attendedDays: 0, totalDays: 0, attendancePercentage: 0 };
    }

    let totalDays = 0;
    let attendedDays = 0;

    
    Object.keys(attendanceData).forEach((month) => {
     
      Object.keys(attendanceData[month]).forEach((day) => {
        const date = new Date(2024, parseInt(month) - 1, parseInt(day)); 
        const dayOfWeek = date.getDay();

        // Exclude Saturdays (6) and Sundays (0)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          totalDays++;
          if (attendanceData[month][day] === "Present") {
            attendedDays++;
          }
          if (attendanceData[month][day] === "Half-day") {
            attendedDays = attendedDays+0.5;
          }
        }
      });
    });

    // Calculate the attendance percentage
    const attendancePercentage =
      totalDays > 0 ? ((attendedDays / totalDays) * 100).toFixed(2) : 0;

    return { attendedDays, totalDays, attendancePercentage };
  };

  const { attendedDays, totalDays, attendancePercentage } =
    calculateAttendance(attendanceData);

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title">Overall Attendance</h5>
            <p className="card-text fs-4">
              {attendedDays} / {totalDays} days
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title">Attendance Percentage</h5>
            <p className="card-text fs-4">{attendancePercentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;
