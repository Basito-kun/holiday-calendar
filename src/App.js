import React, { useState } from 'react';
import './App.css';  // Custom styles for colors
import axios from 'axios';
import CalendarView from './CalendarView';
import CountrySelector from './CountrySelector';
// import randomColor from 'randomcolor';
 

const App = () => {
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);  // Month is zero-based
  const [holidays, setHolidays] = useState([]);

  const fetchHolidays = async () => {
    if ( country && year && month ) {
      try {
        const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY_CAL,
            country: country,
            year: year,
            month: month,
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
      <h5>The global work calendar at your fingertips!</h5>
      <div className="input-container">
        <label>
          Country: 
          <CountrySelector onCountrySelect={(code) => setCountry(code)} /> {/* Integrated the CountrySelector */}
        </label>
        <label>
          Year: 
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
        </label>
        <label>
          Month: 
          <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(Number(e.target.value))} />
        </label>
        <button onClick={fetchHolidays}>Get Holidays</button>
      </div>
      <CalendarView holidays={holidays} year={year} month={month} />
    </div>
  );
};

export default App;