import React, { useState } from "react";
import loadAircraft, { listAirplanes, getAirplaneInfo } from "../aircraft/loadAircraft";
import { computeWeightAndBalance, computeZeroFuel } from "../lib/weightBalance";
import CGEnvelopeChart from "./CGEnvelopeChart";

export default function WeightBalanceCalculator() {

  const airplaneList = listAirplanes();
  const [selectedTail, setSelectedTail] = useState(airplaneList[0]);

  // ⭐ 自动获取机型（C172M）
  const airplaneInfo = getAirplaneInfo(selectedTail);
  const aircraftType = airplaneInfo.type;  // e.g. "C172M"
  

  const [inputs, setInputs] = useState({
    left_seat: "",
    right_seat: "",
    rear_seat: "",
    baggage_1: "",
    baggage_2: "",
    fuel: ""
  });

  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const numericInputs = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, Number(v) || 0])
    );

    const loaded = loadAircraft(selectedTail);
    const r = computeWeightAndBalance(loaded, numericInputs);
    const zeroFuel = computeZeroFuel(loaded, numericInputs);
    setResult({ ...r, zeroFuel, aircraft: loaded });
  };

  const handleChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

return (
    <>
      <h2 style={{ width: "100%" }}>Weight &amp; Balance</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "flex-start"
        }}
      >
        
      {/* Left panel: inputs */}
      <div
        style={{
          flex: "0 0 220px",
          maxWidth: "100%"
        }}
      >
        

        {/* ★ 呼号选择器 */}
        <div style={{ marginBottom: "12px" }}>
          <label>Aircraft (Tail Number): </label>
          <select
            value={selectedTail}
            onChange={e => setSelectedTail(e.target.value)}
          >
            {airplaneList.map(tail => (
              <option key={tail} value={tail}>{tail}</option>
            ))}
          </select>
        </div>

        {/* ★ 自动显示机型（不可选） */}
        <div style={{ marginBottom: "12px" }}>
          <label>Model: </label>
          <input
            value={aircraftType}
            readOnly
            style={{ backgroundColor: "#eee" }}
          />
        </div>

        {/* 以下是 Pilot, Copilot, Fuel 等输入框 */}
                <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ width: "110px", textAlign: "right" }}>Pilot (Left Seat)</label>
          <input
            className="wb-number-input"
            type="number"
            style={{ width: "100px" }}
            value={inputs.left_seat}
            onChange={e => handleChange("left_seat", e.target.value)}
          />
        </div>

                <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ width: "110px", textAlign: "right" }}>Copilot (Right Seat)</label>
          <input
            className="wb-number-input"
            type="number"
            style={{ width: "100px" }}
            value={inputs.right_seat}
            onChange={e => handleChange("right_seat", e.target.value)}
          />
        </div>

                <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ width: "110px", textAlign: "right" }}>Rear Seat</label>
          <input
            className="wb-number-input"
            type="number"
            style={{ width: "100px" }}
            value={inputs.rear_seat}
            onChange={e => handleChange("rear_seat", e.target.value)}
          />
        </div>

                <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ width: "110px", textAlign: "right" }}>Baggage 1</label>
          <input
            className="wb-number-input"
            type="number"
            style={{ width: "100px" }}
            value={inputs.baggage_1}
            onChange={e => handleChange("baggage_1", e.target.value)}
          />
        </div>

                <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ width: "110px", textAlign: "right" }}>Baggage 2</label>
          <input
            className="wb-number-input"
            type="number"
            style={{ width: "100px" }}
            value={inputs.baggage_2}
            onChange={e => handleChange("baggage_2", e.target.value)}
          />
        </div>

                <div style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ width: "110px", textAlign: "right" }}>Fuel (Gallons)</label>
          <input
            className="wb-number-input"
            type="number"
            style={{ width: "100px" }}
            value={inputs.fuel}
            onChange={e => handleChange("fuel", e.target.value)}
          />
        </div>

        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {/* Right panel: result & chart */}
  {result && (
<div
  style={{
  flex: "0 0 100%",   // 小屏：占满一整行
  width: "100%",
  maxWidth: "700px",
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  marginTop: "16px"
}}
>
          <div style={{ marginTop: "10px" }}>
            <h3>Result</h3>
            <p>Total Weight: {result.totalWeight.toFixed(1)} lbs</p>
            <p>CG: {result.cg.toFixed(2)} in</p>

            <p style={{ color: result.inLimits ? "green" : "red" }}>
              {result.inLimits ? "Within CG Envelope" : "Out of Envelope"}
            </p>
          </div>

          {/* ★ 包线图 */}
          <div>
            <CGEnvelopeChart
              normalEnvelope={result.aircraft.envelopeNormal}
              utilityEnvelope={result.aircraft.envelopeUtility}
              currentCG={result.cg}
              currentWeight={result.totalWeight}
              zeroFuelCG={result.zeroFuel?.cg}
              zeroFuelWeight={result.zeroFuel?.totalWeight}
            />
          </div>
        </div>
      )}
      </div>
    </>
  );
}