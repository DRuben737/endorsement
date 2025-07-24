import React, { useState } from 'react';

function MetarWeather() {
  const [icaoCode, setIcaoCode] = useState('');
  const [metarData, setMetarData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetarData = async () => {
    setLoading(true);
    setMetarData(null);
    setError(null);

    try {
      const response = await fetch(`/.netlify/functions/getMetar?icao=${icaoCode}`);
      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setMetarData({ metar: data.metar, taf: data.taf });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="metar-weather">
      <h2>METAR &amp; TAF Weather Information</h2>
      <input
        type="text"
        placeholder="Enter ICAO Code (e.g., KPDX)"
        value={icaoCode}
        onChange={(e) => setIcaoCode(e.target.value)}
      />
      <button onClick={fetchMetarData}>Get Weather</button>

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