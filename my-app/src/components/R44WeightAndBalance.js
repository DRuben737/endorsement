// R44WeightAndBalance.js
import React, { useState } from 'react';
import { calculateR44 } from './r44Calculations'; // 引入计算函数
import Charts from './Charts'; // 引入图表组件
import '../css/WeightAndBalance.css';

const R44WeightAndBalance = () => {
  const [inputs, setInputs] = useState({
    rightSeatFwd: 0,
    leftSeatFwd: 0,
    rightSeatAft: 0,
    frontdoorsoff: 0,
    backdoorsoff: 0,
    leftSeatAft: 0,
    weight: 0,
    longArm: 0,
    latArm: 0,
    mainFuel: 0,
    auxFuel: 0,
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = parseFloat(value) || 0;

    // 限制 mainFuel 的值在 0 到 29.5 之间
    if (name === "mainFuel") {
      newValue = Math.max(0, Math.min(newValue, 29.5));
    }

    // 限制 auxFuel 的值在 0 到 17 之间
    if (name === "auxFuel") {
      newValue = Math.max(0, Math.min(newValue, 17));
    }

    setInputs({
      ...inputs,
      [name]: newValue,
    });
  };

  const handleCalculate = () => {
    const calculationResults = calculateR44(inputs);
    if (calculationResults) {
      setResults(calculationResults);
    } else {
      setResults({});
    }
  };

  return (
    <div>
      <h2>R44 Weight & Balance</h2>
      <div className="form-container">
        {/* 第一行输入字段 */}
        <div className="row-3">
          <div className="form-item">
            <label htmlFor="weight">Aircraft Weight (lbs):</label>
            <input
              id="weight"
              type="number"
              name="weight"
              value={inputs.weight}
              onChange={handleChange}
              step="any"
            />
          </div>
          <div className="form-item">
            <label htmlFor="longArm">Long Arm (in):</label>
            <input
              id="longArm"
              type="number"
              name="longArm"
              value={inputs.longArm}
              onChange={handleChange}
              step="any"
            />
          </div>
          <div className="form-item">
            <label htmlFor="latArm">Lat Arm (in):</label>
            <input
              id="latArm"
              type="number"
              name="latArm"
              value={inputs.latArm}
              onChange={handleChange}
              step="any"
            />
          </div>
        </div>

        {/* 第二行输入字段 */}
        <div className="row-2">
          <div className="form-item">
            <label htmlFor="rightSeatFwd">PIC (lbs):</label>
            <input
              id="rightSeatFwd"
              type="number"
              name="rightSeatFwd"
              value={inputs.rightSeatFwd}
              onChange={handleChange}
              step="any"
            />
          </div>
          <div className="form-item">
            <label htmlFor="leftSeatFwd">SIC or PAX (lbs):</label>
            <input
              id="leftSeatFwd"
              type="number"
              name="leftSeatFwd"
              value={inputs.leftSeatFwd}
              onChange={handleChange}
              step="any"
            />
          </div>
        </div>

        {/* 第三行输入字段 */}
        <div className="row-2">
          <div className="form-item">
            <label htmlFor="rightSeatAft">Right Seat Aft Weight (lbs):</label>
            <input
              id="rightSeatAft"
              type="number"
              name="rightSeatAft"
              value={inputs.rightSeatAft}
              onChange={handleChange}
              step="any"
            />
          </div>
          <div className="form-item">
            <label htmlFor="leftSeatAft">Left Seat Aft Weight (lbs):</label>
            <input
              id="leftSeatAft"
              type="number"
              name="leftSeatAft"
              value={inputs.leftSeatAft}
              onChange={handleChange}
              step="any"
            />
          </div>
        </div>

        {/* 第四行输入字段 */}
        <div className="row-2">
          <div className="form-item">
            <label htmlFor="frontdoorsoff">Front Doors off (numbers):</label>
            <input
              id="frontdoorsoff"
              type="number"
              name="frontdoorsoff"
              value={inputs.frontdoorsoff}
              onChange={handleChange}
              step="any"
            />
          </div>
          <div className="form-item">
            <label htmlFor="backdoorsoff">Back Doors off (lbs):</label>
            <input
              id="backdoorsoff"
              type="number"
              name="backdoorsoff"
              value={inputs.backdoorsoff}
              onChange={handleChange}
              step="any"
            />
          </div>
        </div>

        {/* 第五行输入字段 */}
        <div className="row-2">
          <div className="form-item">
            <label htmlFor="mainFuel">Main Fuel Tank (gallons):</label>
            <input
              id="mainFuel"
              type="number"
              name="mainFuel"
              value={inputs.mainFuel}
              onChange={handleChange}
              step="any"
              min="0"
              max="29.5"
            />
          </div>
          <div className="form-item">
            <label htmlFor="auxFuel">Aux Fuel Tank (gallons):</label>
            <input
              id="auxFuel"
              type="number"
              name="auxFuel"
              value={inputs.auxFuel}
              onChange={handleChange}
              step="any"
              min="0"
              max="17"
            />
          </div>
        </div>

        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {results && (
        <div>
          <h2>Calculation Results</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Weight</th>
                <th>Long arm</th>
                <th>Lat arm</th>
                <th>Long moment</th>
                <th>Lat moment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Empty Fuel</td>
                <td>{typeof results.totalEmptyFuel === 'number' ? results.totalEmptyFuel.toFixed(2) : '-'}</td>
                <td>{typeof results.emptyLongArm === 'number' ? results.emptyLongArm.toFixed(2) : '-'}</td>
                <td>{typeof results.emptyLatArm === 'number' ? results.emptyLatArm.toFixed(2) : '-'}</td>
                <td>{typeof results.totalLongMoment === 'number' ? results.totalLongMoment.toFixed(2) : '-'}</td>
                <td>{typeof results.totalLatMoment === 'number' ? results.totalLatMoment.toFixed(2) : '-'}</td>
              </tr>
              <tr>
                <td>Total with Fuel</td>
                <td>{typeof results.totalWithFuelWeight === 'number' ? results.totalWithFuelWeight.toFixed(2) : '-'}</td>
                <td>{typeof results.totalLongArmWithFuel === 'number' ? results.totalLongArmWithFuel.toFixed(2) : '-'}</td>
                <td>{typeof results.totalLatArmWithFuel === 'number' ? results.totalLatArmWithFuel.toFixed(2) : '-'}</td>
                <td>{typeof results.totalLongMomentWithFuel === 'number' ? results.totalLongMomentWithFuel.toFixed(2) : '-'}</td>
                <td>{typeof results.totalLatMomentWithFuel === 'number' ? results.totalLatMomentWithFuel.toFixed(2) : '-'}</td>
              </tr>
            </tbody>
          </table>

          {/* Display charts */}
          <Charts data={results} />
        </div>
      )}
    </div>
  );
};

export default R44WeightAndBalance;