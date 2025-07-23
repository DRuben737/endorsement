//c172Calculator.js
import React from 'react';

const c172Calculator = ({ frontSeatsWeight, rearSeatsWeight, baggageWeight, fuelWeight }) => {
  // 计算总重量和重心
  const calculateWeights = () => {
    const frontLeftWeight = frontSeatsWeight.left;
    const frontRightWeight = frontSeatsWeight.right;
    const rearLeftWeight = rearSeatsWeight.left;
    const rearRightWeight = rearSeatsWeight.right;
    const totalWeight = frontLeftWeight + frontRightWeight + rearLeftWeight + rearRightWeight + baggageWeight + fuelWeight;

    // 假设重心计算公式（需要根据实际 POH 进行调整）
    const moment = (frontLeftWeight * 37 + frontRightWeight * 37 + rearLeftWeight * 62 + rearRightWeight * 62 + baggageWeight * 85 + fuelWeight * 50);
    const centerOfGravity = totalWeight > 0 ? moment / totalWeight : 0;

    return { totalWeight, centerOfGravity };
  };

  const { totalWeight, centerOfGravity } = calculateWeights();

  return (
    <div className="form-item">
      <div>
        <label>Total Weight:</label>
        <span>{totalWeight.toFixed(2)} lbs</span>
      </div>
      <div>
        <label>Center of Gravity:</label>
        <span>{centerOfGravity.toFixed(2)} inches</span>
      </div>
    </div>
  );
};

export default c172Calculator;