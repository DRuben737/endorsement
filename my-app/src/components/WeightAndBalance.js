/*import React, { useState } from 'react';
import R44WeightAndBalance from './R44WeightAndBalance'; // 引入 R44 组件
import C172WeightAndBalance from './C172WeightAndBalance'; // 引入 C172 组件（如有需要）
import '../css/WeightAndBalance.css';

const WeightAndBalance = () => {
  const [selectedAircraft, setSelectedAircraft] = useState(''); // 保存选择的机型

  const handleAircraftChange = (e) => {
    setSelectedAircraft(e.target.value);
  };

  return (
    <div>
      
      <div className="form-item">
        <label htmlFor="aircraftSelect">Select Aircraft:</label>
        <select id="aircraftSelect" value={selectedAircraft} onChange={handleAircraftChange}>
          <option value="">Select...</option>
          <option value="R44">R44</option>
          <option value="C172">C172</option>
          
        </select>
      </div>

      
      {selectedAircraft === 'R44' && <R44WeightAndBalance />}
      {selectedAircraft === 'C172' && <C172WeightAndBalance />}
      
    </div>
  );
};

export default WeightAndBalance;*/

import React from 'react';

const GoogleSheetButton = () => {
  const handleClick = () => {
    window.location.href = 'https://docs.google.com/spreadsheets/d/18BIrK_MlnOx5HizX9sIlPKaaSihcVW5ZyIRKxi9RpkA/edit?usp=sharing'; // Replace with your actual Google Sheet link
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      Click to Enter Google Sheet
    </button>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  color: 'white',
  backgroundColor: '#4285F4', // Google blue color
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  textDecoration: 'none',
};

export default GoogleSheetButton;