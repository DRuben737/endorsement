import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { calculateR44 } from './r44Calculations';
import '../css/WeightAndBalance.css'; // 导入 CSS 文件

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const Charts = ({ data }) => {
  const results = calculateR44(data);

  // 确保 results 包含正确的数据
  const {
    totalEmptyFuelData = [],
    totalWithFuelData = [],
    totalEmptyFuelLatArm = [],
    totalWithFuelLatArm = []
  } = results || {};

  // Extract x and y values for chart data
  const xValues1 = totalEmptyFuelData.map(point => point.x);
  const yValues1EmptyFuel = totalEmptyFuelData.map(point => point.y);
  const yValues1WithFuel = totalWithFuelData.map(point => point.y);

  const xValues2 = totalEmptyFuelLatArm.map(point => point.x);
  const yValues2EmptyLatArm = totalEmptyFuelLatArm.map(point => point.y);
  const yValues2WithLatArm = totalWithFuelLatArm.map(point => point.y);

  const chartData1 = {
    labels: xValues1,
    datasets: [
      {
        label: 'Total Empty Fuel Weight',
        data: yValues1EmptyFuel,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
        pointRadius: 5, // 确保数据点可见
      },
      {
        label: 'Total with Fuel Weight',
        data: yValues1WithFuel,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
        pointRadius: 5, // 确保数据点可见
      },
    ],
  };

  const chartData2 = {
    labels: xValues2,
    datasets: [
      {
        label: 'Empty Lat Arm',
        data: yValues2EmptyLatArm,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
        pointRadius: 5, // 确保数据点可见
      },
      {
        label: 'Total Lat Arm with Fuel',
        data: yValues2WithLatArm,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
        pointRadius: 5, // 确保数据点可见
      },
    ],
  };

  const options1 = {
    scales: {
      x: {
        min: 91,
        max: 103,
        title: {
          display: true,
          text: 'Long Arm',
        },
      },
      y: {
        min: 1500,
        max: 2500,
        title: {
          display: true,
          text: 'Weight',
        },
      },
    },
  };

  const options2 = {
    scales: {
      x: {
        min: 91,
        max: 103,
        title: {
          display: true,
          text: 'Long Arm',
        },
      },
      y: {
        min: -4,
        max: 4,
        title: {
          display: true,
          text: 'Lat Arm',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Chart 1: Total Empty Fuel and Total with Fuel</h2>
      <Line data={chartData1} options={options1} />
      <h2>Chart 2: Lat Arm with and without Fuel</h2>
      <Line data={chartData2} options={options2} />
    </div>
  );
};

export default Charts;