import React, { useState } from 'react';
import './App.css';  // Custom styles for colors
import axios from 'axios';
import CalendarView from './CalendarView';
// import randomColor from 'randomcolor';


const App = () => {
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);


  const fetchHolidays = async () => {
    if ( country && year ) {
      try {
        const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY_CAL,
            country: country,
            year: year,
          },
        });

        const fetchedHolidays = response.data.response.holidays;
        setHolidays(fetchedHolidays);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Holiday Calendar</h1>
      <div className="input-container">
        <label>
          Country: 
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value.toUpperCase())} placeholder="e.g. US, NG" />
        </label>
        <label>
          Year: 
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <button onClick={fetchHolidays}>Get Holidays</button>
      </div>
      <CalendarView holidays={holidays} />
    </div>
  );
};

export default App;