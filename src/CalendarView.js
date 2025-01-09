import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = ({ holidays }) => {
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const holiday = holidays.find(
        (holiday) => new Date(holiday.date.iso).toDateString() === date.toDateString()
      );
      if (holiday) {
        return (
          <div style={{ backgroundColor: holidayColor(holiday.country.id), color: 'white', borderRadius: '5%' }}>
            {holiday.name}
          </div>
        );
      }
    }
    return null;
  };

  const holidayColor = (countryCode) => {
    const colors = {
      US: 'blue',
      NG: 'green',
      GB: '#1E90FF',
      // Add more countries here
    };
    return colors[countryCode] || 'magenta'; // Default color
  };

  return (
    <Calendar
      tileContent={tileContent}
      nextLabel="Month >"
      prevLabel="< Month"
      next2Label="Year >>"
      prev2Label="<< Year"
    />
  );
};

export default CalendarView;
