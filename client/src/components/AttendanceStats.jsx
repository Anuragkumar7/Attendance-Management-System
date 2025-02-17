import React from "react";

const AttendanceStats = ({ attendanceData }) => {
  const totalpresentDays = attendanceData.filter(
    (record) => record.status === "Present"
  ).length;

  const totalabsentDays = attendanceData.filter(
    (record) => record.status === "Absent"
  ).length;

  const totalhalfDays = attendanceData.filter(
    (record) => record.status === "Half-day"
  ).length;

  const totalPresent = totalhalfDays / 2 + totalpresentDays;
  return (
    <div className="row mb-4 g-3">
      <div className="col-md-3">
        <div className="card bg-primary text-white shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Present (Days)</h5>
            <p className="card-text display-4">{totalpresentDays}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-danger text-white shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Absent (Days)</h5>
            <p className="card-text display-4">{totalabsentDays}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-warning text-dark shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Half (Days)</h5>
            <p className="card-text display-4">{totalhalfDays}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-success text-white shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Total Present (Days)</h5>
            <p className="card-text display-4">{totalPresent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;
