import React, { useState } from 'react';

function MetarWeather() {
  const [icaoCode, setIcaoCode] = useState('');
  const [metarData, setMetarData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetarData = async () => {
    const trimmed = icaoCode.trim().toUpperCase();
    if (!/^[A-Z]{3,4}$/.test(trimmed)) {
      setError('Please enter a valid 3- or 4-letter ICAO code.');
      return;
    }

    setLoading(true);
    setMetarData(null);
    setError(null);

    try {
      const response = await fetch(`/.netlify/functions/getMetar?icao=${trimmed}`);
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
        placeholder="Enter ICAO Code (e.g., PDX or KPDX)"
        value={icaoCode}
        onChange={(e) => setIcaoCode(e.target.value.toUpperCase())}
      />
      <button onClick={fetchMetarData}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && !metarData && <p>Please enter an ICAO code above.</p>}
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