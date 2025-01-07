import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css'; // Add custom styles here

function CalendarView({ holidays, countryColors }) {
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const holiday = holidays.find(
        (h) => new Date(h.date.iso).toDateString() === date.toDateString()
      );
      return holiday ? `holiday ${countryColors[holiday.country.id]}` : null;
    }
    return null;
  };

  return (
    <div>
      <h2>Holiday Calendar</h2>
      <Calendar tileClassName={tileClassName} />
      <div className="legend">
        {Object.entries(countryColors).map(([country, color]) => (
          <p key={country} style={{ color }}>
            {country.toUpperCase()}: {color}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
