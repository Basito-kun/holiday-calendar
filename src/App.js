import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional styling
import CalendarView from './CalendarView';
import randomColor from 'randomcolor';

function App() {
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState('');
  const [countryColors, setCountryColors] = useState({});

  const fetchHolidays = async () => {
    try {
      setError(''); // Clear any previous error
      const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY_CAL,
          country: country,
          year: year,
        },
      });

      const fetchedHolidays = response.data.response.holidays;
      const newColor = randomColor(); // Assign a random color for each country
      setCountryColors((prev) => ({ ...prev, [country]: newColor }));
      setHolidays(fetchedHolidays);
    } catch (err) {
      setError(err.response ? err.response.data.error.message : 'An error occurred');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHolidays();
  };

  return (
    <div className="App">
      <h1>Holiday Calendar</h1>
      <h5>The global work calendar at your fingertips!</h5>
      <form onSubmit={handleSubmit}>
        <label>
          Country Code (e.g., US, NG, IN):
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country code"
          />
        </label>
        <br />
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
          />
        </label>
        <br />
        <button type="submit">Get Holidays</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {holidays.length > 0 && <CalendarView holidays={holidays} countryColors={countryColors} />}
    </div>
  );
}

export default App;
