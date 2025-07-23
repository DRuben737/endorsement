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
      const correctedIcao = icaoCode.length === 3 ? `K${icaoCode.toUpperCase()}` : icaoCode.toUpperCase();
      const url = `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${correctedIcao}&format=raw&hours=0&taf=on`;

      const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`, {
        headers: { 'Accept': '*/*' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch METAR/TAF data');
      }

      const text = await response.text();

      const metarMatch = text.match(/(?:^|\n)METAR\s+(.*?)(?=\n|$)/);
      const tafMatch = text.match(/(?:^|\n)TAF\s+(.*?)(?=\n|$)/);

      const metar = metarMatch ? `METAR ${metarMatch[1].trim()}` : 'No METAR found.';
      const taf = tafMatch ? `TAF ${tafMatch[1].trim()}` : 'No TAF found.';

      setMetarData({ metar, taf });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="metar-weather">
      <h2>METAR Weather Information</h2>
      <input
        type="text"
        placeholder="Enter ICAO Code"
        value={icaoCode}
        onChange={(e) => setIcaoCode(e.target.value)}
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