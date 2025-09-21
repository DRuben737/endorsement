// CrosswindVisualizer.js
import { useState } from 'react';
import CrosswindDiagram from './CrosswindDiagram';
import '../css/CrosswindVisualizer.css';

function CrosswindVisualizer() {
  const [windSpeed, setWindSpeed] = useState(15);
  const [windDirection, setWindDirection] = useState(270);
  const [runwayDirection, setRunwayDirection] = useState(36);

  const handleWindSpeedChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setWindSpeed(value);
    }
  };

  const handleWindDirectionChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      // Normalize wind direction to [0, 360)
      setWindDirection(((value % 360) + 360) % 360);
    }
  };

  const handleRunwayDirectionChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 36) {
      setRunwayDirection(value);
    }
  };

  return (
    <div className="crosswindContainer">
      <h2 className="crosswindTitle">Crosswind Simulator</h2>

      <div className="inputGroup">
        <label className="label">Wind Speed (kt)</label>
        <input
          className="numberInput"
          type="number"
          min="0"
          max="100"
          placeholder="Enter wind speed"
          value={windSpeed}
          onChange={handleWindSpeedChange}
        />
      </div>

      <div className="inputGroup">
        <label className="label">Wind Direction (0 - 360°)</label>
        <input
          className="numberInput"
          type="number"
          min="0"
          max="360"
          placeholder="Enter wind direction"
          value={windDirection}
          onChange={handleWindDirectionChange}
        />
      </div>

      <div className="inputGroup">
        <label className="label">Runway (01 - 36)</label>
        <input
          className="numberInput"
          type="number"
          min="1"
          max="36"
          placeholder="Enter runway heading"
          value={runwayDirection}
          onChange={handleRunwayDirectionChange}
        />
      </div>

      <CrosswindDiagram
        windSpeed={windSpeed}
        windDirection={windDirection}
        runwayDirection={runwayDirection}
      />
    </div>
  );
}

export default CrosswindVisualizer;