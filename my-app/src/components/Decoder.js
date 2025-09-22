import React, { useState } from "react";
import decoderData from "./decoderData";

const Decoder = () => {
  const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filterByCategory = (category) => {
    if (category === "Weather") {
      return ["METAR", "TAF", "METAR/TAF", "NWS"];
    }
    if (category === "General") {
      return ["GEN", "ATC", "ICAO"];
    }
    return ["METAR", "TAF", "METAR/TAF", "GEN", "NWS", "ATC", "ICAO"];
  };

  const words = input.toUpperCase().split(/\s+/); // 按空格拆分
  const filteredData = decoderData.filter(
    (item) =>
      filterByCategory(activeCategory).includes(item.usage) &&
      words.includes(item.contraction.toUpperCase())
  );

  // 创建一个映射表，方便替换缩写为定义
  const contractionMap = {};
  filteredData.forEach(item => {
    contractionMap[item.contraction.toUpperCase()] = `${item.contraction} (${item.definition})`;
  });

  // 构造自然语言结果
  const naturalLanguageResult = words.map(word => {
    if (contractionMap[word]) {
      return contractionMap[word];
    }
    return word;
  }).join(" ");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Decoder</h2>

      {/* 输入框 */}
      <textarea
        placeholder="Enter contraction (e.g. BKN, TAF, C)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px", height: "100px" }}
      />

      {/* 分类按钮 */}
      {input.trim() !== "" && (
        <div style={{ marginBottom: "10px" }}>
          <button onClick={() => setActiveCategory("Weather")}>Weather</button>
          <button onClick={() => setActiveCategory("General")}>General</button>
          <button onClick={() => setActiveCategory("All")}>All</button>
        </div>
      )}

      {/* 结果 */}
      <div>
        {input.trim() !== "" ? (
          filteredData.length > 0 ? (
            <p>{naturalLanguageResult}</p>
          ) : (
            <p>No match found.</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Decoder;