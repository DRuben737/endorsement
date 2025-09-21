


import React, { useState } from "react";
import "../css/CrosswindVisualizer.css";

function CrosswindSimulator() {
  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [runwayHeading, setRunwayHeading] = useState(0);

  const angleRad = ((windDirection - runwayHeading + 360) % 360) * (Math.PI / 180);
  const crosswind = Math.abs(windSpeed * Math.sin(angleRad)).toFixed(1);
  const headwind = (windSpeed * Math.cos(angleRad)).toFixed(1);

  return (
    <div className="crosswind-container">
      <h2>Crosswind Simulator</h2>
      <div className="inputs">
        <label>
          Wind Direction:
          <input
            type="number"
            value={windDirection}
            onChange={(e) => setWindDirection(Number(e.target.value))}
            placeholder="0 - 359"
            min="0"
            max="359"
          />
        </label>
        <label>
          Wind Speed (kt):
          <input
            type="number"
            value={windSpeed}
            onChange={(e) => setWindSpeed(Number(e.target.value))}
            placeholder="knots"
            min="0"
          />
        </label>
        <label>
          Runway Heading:
          <input
            type="number"
            value={runwayHeading}
            onChange={(e) => setRunwayHeading(Number(e.target.value))}
            placeholder="0 - 36"
            min="0"
            max="36"
          />
        </label>
      </div>
      <div className="results">
        <p>Crosswind Component: {crosswind} kt</p>
        <p>{headwind >= 0 ? "Headwind" : "Tailwind"} Component: {Math.abs(headwind)} kt</p>
      </div>
      <div className="visualization">
        <div className="runway" style={{ transform: `rotate(${runwayHeading * 10}deg)` }}>
          ✈️
        </div>
        <div className="wind-arrow" style={{ transform: `rotate(${windDirection}deg)` }}>
          ➤
        </div>
      </div>
    </div>
  );
}

export default CrosswindSimulator;