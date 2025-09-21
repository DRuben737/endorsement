// CrosswindDiagram.js
import React from 'react';
import '../css/CrosswindVisualizer.css';

const CrosswindDiagram = ({ windDirection, windSpeed, runwayNumber }) => {
  const runwayHeading = runwayNumber * 10;
  const angleRad = ((windDirection - runwayHeading) * Math.PI) / 180;

  const crosswind = Math.abs(windSpeed * Math.sin(angleRad));
  const headwind = windSpeed * Math.cos(angleRad);

  // 图形参数
  const center = 100;
  const radius = 60;
  const windArrowLength = 50;

  // 坐标计算函数
  const getArrowCoords = (angleDeg, length) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: center + length * Math.cos(rad),
      y: center + length * Math.sin(rad),
    };
  };

  const windArrow = getArrowCoords(windDirection, windArrowLength);

  return (
    <div className="diagramContainer">
      <svg width="200" height="200" className="crosswindDiagram">
        {/* 圆形背景 */}
        <circle cx={center} cy={center} r={radius} fill="#f0f8ff" stroke="#ccc" />

        {/* 跑道（旋转） */}
        <g transform={`rotate(${runwayHeading}, ${center}, ${center})`}>
          <rect
            x={center - 10}
            y={center - 60}
            width={20}
            height={120}
            fill="#333"
            rx={4}
          />
          <text x={center} y={center - 50} fill="#fff" textAnchor="middle" fontSize="12">
            {String(runwayNumber).padStart(2, '0')}
          </text>
        </g>

        {/* 风向箭头 */}
        <line
          x1={center}
          y1={center}
          x2={windArrow.x}
          y2={windArrow.y}
          stroke="#2b8fd2"
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
        />

        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#2b8fd2" />
          </marker>
        </defs>
      </svg>

      {/* 数值显示 */}
      <div className="results">
        <div className="resultItem">
          <strong>Crosswind:</strong> {crosswind.toFixed(1)} kt
        </div>
        <div className="resultItem">
          <strong>{headwind >= 0 ? 'Headwind' : 'Tailwind'}:</strong> {Math.abs(headwind).toFixed(1)} kt
        </div>
      </div>
    </div>
  );
};

export default CrosswindDiagram;