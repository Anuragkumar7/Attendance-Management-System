import React from "react";

const AttendanceSection = ({ attendanceData }) => {
  const totalpresentDays = attendanceData.filter(
    (record) => record.status === "Present"
  ).length;

  const totalhalfDays = attendanceData.filter(
    (record) => record.status === "Half-day"
  ).length;

  const totalPresent = totalpresentDays + totalhalfDays / 2;
  const calculateAttendance = (attendanceData) => {
    if (!attendanceData || Object.keys(attendanceData).length === 0) {
      return { attendedDays: 0, totalDays: 0, attendancePercentage: 0 };
    }

    const currentMonth = new Date().getMonth(); // Current month (0-indexed)
    const currentYear = new Date().getFullYear(); // Current year
    const today = new Date(); // Today's date
    const currentDay = today.getDate(); // Get current day of the month
// console.log(attendanceData[currentMonth+1].status);
    let totalDays = 0;
    let attendedDays = 0;

    // Iterate over the days of the current month up to today
    for (let day = 1; day <= currentDay; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayOfWeek = date.getDay();

      // Exclude Saturdays (6) and Sundays (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      totalDays++;
        
        if (
          attendanceData[currentMonth + 1] &&
          attendanceData[currentMonth + 1].status === "Present"
        ) {
          attendedDays++;
        }if( attendanceData[currentMonth + 1] &&
          attendanceData[currentMonth + 1].status === "Half-day"){
            attendedDays += 0.5;
          }
      }
    }

    // Calculate the attendance percentage
    const attendancePercentage =
      totalPresent > 0 ? ((totalPresent / (totalDays )) * 100).toFixed(2) : 0;

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
              {totalPresent} / {totalDays} days
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
