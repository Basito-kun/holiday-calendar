import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './CountrySelector.css';

const CountrySelector = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryData = response.data.map(country => ({
          code: country.cca2, // ISO Alpha-2 code
          name: country.name.common,
          flag: country.flags.svg,
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCountries([]);
      setShowDropdown(false); // Hide dropdown if search term is empty
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowDropdown(filtered.length > 0); // Show dropdown only if there are results
    }
  }, [searchTerm, countries]);

  const handleCountryClick = (country) => {
    onCountrySelect(country.code); // Notify parent with country code
    setShowDropdown(false); // Hide dropdown after selection
    setSearchTerm(country.name); // Set selected country name in input
    setFilteredCountries([]);     // Clear the filtered list
  };

  const handleBlur = (event) => {
    if (!dropdownRef.current.contains(event.relatedTarget)) {
      setShowDropdown(false);  // Close dropdown if focus moves away
    }
  };

  return (
    <div className="country-selector" ref={dropdownRef} onBlur={handleBlur}>
      <input
        type="text"
        placeholder="Enter country"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(filteredCountries.length > 0)}
      />
      {showDropdown && (
        <ul className="dropdown">
          {filteredCountries.map((country) => (
            <li key={country.code} onClick={() => handleCountryClick(country)} tabIndex={0}> 
              <img src={country.flag} alt={`${country.name} flag`} style={{ width: '20px', marginRight: '8px' }} />
              {country.name} ({country.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySelector;
