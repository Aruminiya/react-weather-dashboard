import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Country = {
  name: string;
  zho: string;
  latlng: [number, number];
  timezones: string[];
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        console.log(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countryData = response.data.map((country: any) => ({
          name: country.name.common, 
          zho: country.translations?.zho?.common, // 使用中文名稱
          latlng: country.latlng,
          timezones: country.timezones,
        }));
        setCountries(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Country List</h1>
      <br />
      <ul>
        {countries.map((country, index) => (
          <div key={index}>
            <li >
              <strong>{country.zho}</strong>
              <br />
              <strong>{country.name}</strong>
              <br />
              <p>Latitude: {country.latlng[0]}, Longitude: {country.latlng[1]}</p>
              <p>Timezones: {country.timezones.join(', ')}</p>
            </li>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;