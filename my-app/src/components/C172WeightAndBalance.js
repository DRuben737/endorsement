import React, { useState } from 'react';
import WeightAndBalanceCalculator from './c172Calculator'; // 引入计算组件
import '../css/WeightAndBalance.css'; // 引入样式文件

const C172WeightAndBalance = () => {
  // 定义状态变量
  const [frontSeatsWeight, setFrontSeatsWeight] = useState({ left: 0, right: 0 });
  const [rearSeatsWeight, setRearSeatsWeight] = useState({ left: 0, right: 0 });
  const [baggageWeight, setBaggageWeight] = useState(0);
  const [fuelWeight, setFuelWeight] = useState(0);

  return (
    <div>
      <h2>C172 Weight & Balance</h2>
      <div className="form-container">
        {/* Front Seats */}
        <div className="form-item">
          <label htmlFor="frontLeft">Front Left Seat Weight (lbs):</label>
          <input
            type="number"
            id="frontLeft"
            value={frontSeatsWeight.left}
            onChange={(e) => setFrontSeatsWeight({ ...frontSeatsWeight, left: parseFloat(e.target.value) })}
          />
        </div>
        <div className="form-item">
          <label htmlFor="frontRight">Front Right Seat Weight (lbs):</label>
          <input
            type="number"
            id="frontRight"
            value={frontSeatsWeight.right}
            onChange={(e) => setFrontSeatsWeight({ ...frontSeatsWeight, right: parseFloat(e.target.value) })}
          />
        </div>

        {/* Rear Seats */}
        <div className="form-item">
          <label htmlFor="rearLeft">Rear Left Seat Weight (lbs):</label>
          <input
            type="number"
            id="rearLeft"
            value={rearSeatsWeight.left}
            onChange={(e) => setRearSeatsWeight({ ...rearSeatsWeight, left: parseFloat(e.target.value) })}
          />
        </div>
        <div className="form-item">
          <label htmlFor="rearRight">Rear Right Seat Weight (lbs):</label>
          <input
            type="number"
            id="rearRight"
            value={rearSeatsWeight.right}
            onChange={(e) => setRearSeatsWeight({ ...rearSeatsWeight, right: parseFloat(e.target.value) })}
          />
        </div>

        {/* Baggage and Fuel */}
        <div className="form-item">
          <label htmlFor="baggage">Baggage Weight (lbs):</label>
          <input
            type="number"
            id="baggage"
            value={baggageWeight}
            onChange={(e) => setBaggageWeight(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-item">
          <label htmlFor="fuel">Fuel Weight (lbs):</label>
          <input
            type="number"
            id="fuel"
            value={fuelWeight}
            onChange={(e) => setFuelWeight(parseFloat(e.target.value))}
          />
        </div>

        {/* 使用计算组件 */}
        <WeightAndBalanceCalculator
          frontSeatsWeight={frontSeatsWeight}
          rearSeatsWeight={rearSeatsWeight}
          baggageWeight={baggageWeight}
          fuelWeight={fuelWeight}
        />
      </div>
    </div>
  );
};

export default C172WeightAndBalance;