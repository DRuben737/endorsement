import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

function MetarWeather() {
  const [icaoCode, setIcaoCode] = useState(''); // 用于存储用户输入的ICAO代码
  const [metarData, setMetarData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetarData = async () => {
    setLoading(true);
    try {
      const correctedIcao = icaoCode.length === 3 ? `K${icaoCode.toUpperCase()}` : icaoCode.toUpperCase();
      const corsProxy = 'https://corsproxy.io/?';
      const apiUrl = `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${correctedIcao}&format=raw&hours=0&taf=on`;
      const response = await fetch(`${corsProxy}${encodeURIComponent(apiUrl)}`, {
        headers: { 'accept': '*/*' },
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const text = await response.text();
      const metarMatch = text.match(/METAR (.*?)\n/);
      const tafMatch = text.match(/TAF(.*?)\n/);

      const metar = metarMatch ? 'METAR ' + metarMatch[1].trim() : 'No METAR found.';
      const taf = tafMatch ? 'TAF' + tafMatch[1].trim() : 'No TAF found.';

      setMetarData({ metar, taf });
      setError(null);
    } catch (err) {
      setError(err.message);
      setMetarData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="metar-weather">
      <Helmet>
        <title>METAR Weather | Pilot Seal</title>
      </Helmet>
      <h2>METAR Weather Information</h2>
      
      <input
        type="text"
        placeholder="Enter ICAO Code"
        value={icaoCode}
        onChange={(e) => setIcaoCode(e.target.value)} // 更新ICAO代码的状态
      />
      <button onClick={fetchMetarData}>Get METAR</button>

      {loading && <p>Loading...</p>}
      
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