import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional styling

function App() {
  const [data, setData] = useState([]); // To store API data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchData = async () => {
      /*
      const apiKey = process.env.REACT_APP_API_KEY_HA; // Get API key from .env file
      console.log('API Key:', apiKey); // Just for testing purposes
      const url = 'https://holidayapi.com/v1/countries'; // Replace with your API endpoint
      */
      try {
        setLoading(true); // Set loading to true before the request
        const response = await axios.get('https://holidayapi.com/v1/countries', {        
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY_HA}`, // Use the API key in the Authorization header
          },
        });
        /*
          {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Use the API key in the Authorization header
          },
        });
        */ 
        setData(response.data); // Store the response data in state
      } catch (err) {
        console.error('API Error:', err); // Log the full error
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Turn off loading after the request completes
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures the fetch runs only once

  // Render the UI
  return (
    <div className="App">
      <h1>API Data</h1>

      {/* Show a loading message while fetching data */}
      {loading && <p>Loading...</p>}

      {/* Show an error message if the API request fails */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display the data if it is successfully fetched */}
      {!loading && !error && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

