import React, { useState } from 'react';

function MetarWeather() {
  const [icaoCode, setIcaoCode] = useState(''); // 用于存储用户输入的ICAO代码
  const [metarData, setMetarData] = useState(null);
  const [error, setError] = useState(null);

  const fetchMetarData = async () => {
    try {
      const corsProxy = 'https://corsproxy.io/?';
      const apiUrl = `https://aviationweather.gov/api/data/metar?ids=${icaoCode.toUpperCase()}&format=json&taf=true&hours=1`;
      const response = await fetch(`${corsProxy}${encodeURIComponent(apiUrl)}`, {
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const metar = data.metars ? data.metars[0]?.raw_text || 'No METAR found.' : 'No METAR found.';
      const taf = data.tafs ? data.tafs[0]?.raw_text || 'No TAF found.' : 'No TAF found.';
      
      setMetarData({ metar, taf });
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
          <h3>METAR</h3>
          <pre>{metarData.metar}</pre>
          <h3>TAF</h3>
          <pre>{metarData.taf}</pre>
        </div>
      )}
    </div>
  );
}

export default MetarWeather;