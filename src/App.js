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
  const [error, setError] = useState('');

  const fetchHolidays = async () => {
    setError('');
    if (country && /^[A-Z]{2}$/.test(country)) {
      try {
        const response = await axios.get("https://calendarific.com/api/v2/holidays", {
          params: {
            api_key: process.env.REACT_APP_API_KEY_CAL,
            country: country.toUpperCase(),
            year: year,
          },
        });

        const fetchedHolidays = response.data.response.holidays;
        setHolidays(fetchedHolidays);
        console.log(fetchedHolidays);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setError('Unable to fetch holidays. Please try again later.');
      }
    } else {
      setError('Invalid country entered');  // Set error message if country is invalid
    }
  };

  
  return (
    <div className="App">
      <div className="bg-overlay">
        <h1>Holiday Calendar</h1>  
        <p>Global Holidays at your Fingertips!</p>
      </div>
      <div className="input-container">
        <div>
          <h1>Let the exploration Begin!</h1>
        </div>
        <label>
          Country: 
          <CountrySelector onCountrySelect={(code) => setCountry(code)} /> {/* Integrated the CountrySelector */}
          {error && <p style={{ color: 'red', marginBottom: '5px' }}>{error}</p>}  {/* Error message rendering */}
        </label>
        <label>
          Year: 
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
        </label>
        <label>
          Month: 
          <input type="number" min="1" max="12" style={{ height: '45px' }} value={month} onChange={(e) => setMonth(Number(e.target.value))} />
        </label>
        
        <button onClick={ fetchHolidays }>Get Holidays</button>
      </div>
      <CalendarView holidays={holidays} year={year} month={month} />
    </div>
  );
};

export default App;