import React, { useState } from 'react';

function MetarWeather() {
  const [icaoCode, setIcaoCode] = useState(''); // 用于存储用户输入的ICAO代码
  const [metarData, setMetarData] = useState(null);
  const [error, setError] = useState(null);

  const fetchMetarData = async () => {
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://aviationweather.gov/api/data/metar?ids=${icaoCode}&format=json&taf=true&hours=3`,
        {
          headers: {
            'accept': '*/*',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setMetarData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMetarData(null);
    }
  };

  return (
    <div className="metar-weather">
      <h2>METAR Weather Information</h2>
      
      <input
        type="text"
        placeholder="Enter ICAO Code"
        value={icaoCode}
        onChange={(e) => setIcaoCode(e.target.value)} // 更新ICAO代码的状态
      />
      <button onClick={fetchMetarData}>Get METAR</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {metarData && (
        <div>
          <h3>METAR Data</h3>
          <pre>{JSON.stringify(metarData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MetarWeather;