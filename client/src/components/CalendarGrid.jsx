import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Icon for carousel buttons

const CalendarGrid = ({ attendanceData }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthIndex = new Date().getMonth();
  const [activeIndex, setActiveIndex] = useState(currentMonthIndex);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const generateCalendar = (monthIndex) => {
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDay = new Date(year, monthIndex, 1).getDay();

    let calendar = [];
    let week = Array(firstDay).fill(null); // Fill empty slots at start

    for (let date = 1; date <= daysInMonth; date++) {
      week.push(date);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      calendar.push(week);
    }

    return calendar;
  };

  const getDateColor = (date, monthIndex) => {
    if (!date) return "bg-light text-muted"; // Empty slots

    const year = new Date().getFullYear();
    const formattedDate = `${year}-${String(monthIndex + 1).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;

    const record = attendanceData.find((entry) => entry.date === formattedDate);

    if (!record) return "bg-light text-dark"; // Default if no record

    switch (record.status.toLowerCase()) {
      case "present":
        return "bg-success text-white fw-bold";
      case "half-day":
        return "bg-warning text-dark fw-bold";
      case "absent":
        return "bg-danger text-white fw-bold";
      default:
        return "bg-light text-dark";
    }
  };

  return (
    <div className="calendar-container position-relative">
      <Carousel
        interval={null}
        indicators={false}
        controls={false}
        activeIndex={activeIndex}
        onSelect={handleSelect}
        className="carousel-dark"
      >
        {months.map((month, monthIndex) => (
          <Carousel.Item key={monthIndex}>
            <div className="container">
              <h5 className="text-center my-3 text-dark font-weight-bold">
                {month}
              </h5>
              <div className="row g-0 mb-3">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div
                    key={index}
                    className="col text-center py-2 bg-primary text-white rounded-top"
                  >
                    <strong>{day}</strong>
                  </div>
                ))}
              </div>

              {generateCalendar(monthIndex).map((week, weekIndex) => (
                <div key={weekIndex} className="row g-0">
                  {week.map((date, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`col text-center p-3 border border-1 rounded d-flex justify-content-center align-items-center cursor-pointer ${getDateColor(
                        date,
                        monthIndex
                      )}`}
                      style={{
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      {date}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Navigation Buttons */}
      <button
        className="carousel-control-prev custom-carousel-btn position-absolute top-50 start-0 translate-middle-y"
        onClick={() =>
          handleSelect((activeIndex - 1 + months.length) % months.length)
        }
        style={{ zIndex: 10 }}
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        className="carousel-control-next custom-carousel-btn position-absolute top-50 end-0 translate-middle-y"
        onClick={() => handleSelect((activeIndex + 1) % months.length)}
        style={{ zIndex: 10 }}
      >
        <FaChevronRight size={24} />
      </button>

      {/* Legend */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <span className="badge bg-success text-white mx-2 p-2 shadow">
          Present
        </span>
        <span className="badge bg-warning text-dark mx-2 p-2 shadow">
          Half-Day
        </span>
        <span className="badge bg-danger text-white mx-2 p-2 shadow">
          Absent
        </span>
      </div>
    </div>
  );
};

export default CalendarGrid;
