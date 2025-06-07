import React, { useState } from "react";
import "./App.css";

const holidays = {
  "2025-07-04": "Independence Day 🇺🇸",
  "2025-12-25": "Christmas 🎄",
  "2025-11-27": "Thanksgiving 🦃",
};

function App() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null); // empty cells
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    return days;
  };

  const days = getMonthDays();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className="calendar-container">
      <h1 className="title">🧭 Futuristic Calendar</h1>
      <div className="controls">
        <button onClick={prevMonth}>⬅</button>
        <h2>{monthName} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth}>➡</button>
      </div>
      <div className="calendar">
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="weekday">{d}</div>
          ))}
        </div>
        <div className="days">
          {days.map((day, index) => {
            const key = day ? day.toISOString().split("T")[0] : index;
            const isHoliday = day && holidays[key];
            return (
              <div key={key} className={`day ${isHoliday ? "holiday" : ""}`}>
                {day ? (
                  <>
                    <span className="date">{day.getDate()}</span>
                    {isHoliday && <span className="holiday-name">{holidays[key]}</span>}
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
