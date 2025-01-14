import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = ({ holidays, year, month }) => {
  const [date, setDate] = useState(new Date(year, month - 1)); // Initialize with provided year and month
  
  useEffect(() => {
    setDate(new Date(year, month - 1));  // Update when year or month changes
  }, [year, month]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const holiday = holidays.find(
        (holiday) => new Date(holiday.date.iso).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
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
  
  // const calendarDate = new Date(year, month - 1);  // Set calendar to specified year and month

  const navigateToToday = () => setDate(new Date()); // Set the date to today

  return(
    <Calendar
      value={date}
      onChange={setDate}
      tileContent={tileContent}
      nextLabel={<span style={{ opacity: 0.5, pointerEvents: 'none' }}></span>}
      prevLabel={<span style={{ opacity: 0.5, pointerEvents: 'none' }}></span>}
      next2Label={<span style={{ opacity: 0.5, pointerEvents: 'none' }}>oday</span>}
      prev2Label={<span onClick={navigateToToday}>Today</span>}
    />
  );
};

export default CalendarView;