
import React, { useEffect } from 'react';
import '../css/FlightBrief.css';

function FlightBrief() {
  useEffect(() => {
    let latestAltimeter = null;
    let latestTemperatureC = null;

    const btnCross = document.getElementById('btnCross');
    const btnLocal = document.getElementById('btnLocal');
    const crossCountryFields = document.getElementById('crossCountryFields');
    const departure = document.getElementById('departure');
    const arrival = document.getElementById('arrival');
    const addStopBtn = document.getElementById('addStop');

    if (btnCross && btnLocal && crossCountryFields && departure && arrival && addStopBtn) {
      btnCross.addEventListener('click', () => {
        crossCountryFields.classList.remove('hidden');
        crossCountryFields.removeAttribute('hidden');
        btnCross.classList.add('active');
        btnLocal.classList.remove('active');
        arrival.value = '';
      });

      btnLocal.addEventListener('click', () => {
        crossCountryFields.classList.add('hidden');
        crossCountryFields.setAttribute('hidden', '');
        btnLocal.classList.add('active');
        btnCross.classList.remove('active');
        arrival.value = departure.value;
      });

      departure.addEventListener('input', () => {
        if (crossCountryFields.classList.contains('hidden')) {
          arrival.value = departure.value;
        }
      });

      addStopBtn.addEventListener('click', () => {
        const stopDiv = document.createElement('div');
        stopDiv.classList.add('flex', 'items-center', 'gap-2');
        stopDiv.innerHTML = `
          <input type="text" name="stop[]" class="stop-input w-full p-2 border border-gray-300 rounded" />
          <button type="button" class="remove-stop text-red-500 font-bold">✕</button>
        `;
        crossCountryFields.insertBefore(stopDiv, addStopBtn);
      });

      // Event delegation for removing stops
      crossCountryFields.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-stop')) {
          e.target.parentElement.remove();
        }
      });
    }

    // --------- Weather Info Section ---------
    async function fetchData(url) {
      const response = await fetch(url);
      return await response.json();
    }

    async function displayWeather() {
      const airports = [];
      const dep = document.getElementById('departure')?.value.trim().toUpperCase();
      if (dep) airports.push(dep);
      const stops = Array.from(document.querySelectorAll('.stop-input'))
        .map(i => i.value.trim().toUpperCase())
        .filter(Boolean);
      airports.push(...stops);
      const arr = document.getElementById('arrival')?.value.trim().toUpperCase();
      if (arr && arr !== dep) airports.push(arr);
      const uniqueAirports = [...new Set(airports)];
      const metarSection = document.getElementById('metar-section');
      const tafSection = document.getElementById('taf-section');
      const airsigmetSection = document.getElementById('airsigmet-section');
      if (!metarSection || !tafSection || !airsigmetSection) return;
      metarSection.innerHTML = '';
      tafSection.innerHTML = '';
      airsigmetSection.innerHTML = '';
      for (const icao of uniqueAirports) {
        const metarUrl = `https://brief.r1978244759.workers.dev/?url=https://avwx.rest/api/metar/${icao}?format=json`;
        const tafUrl = `https://brief.r1978244759.workers.dev/?url=https://avwx.rest/api/taf/${icao}?format=json`;
        const metarData = await fetchData(metarUrl);
        const tafData = await fetchData(tafUrl);

        if (!latestAltimeter && metarData?.altimeter?.value) {
          latestAltimeter = metarData.altimeter.value;
        }
        if (!latestTemperatureC && metarData?.temperature?.value) {
          latestTemperatureC = metarData.temperature.value;
          const tempInput = document.getElementById('outsideTemp');
          if (tempInput) tempInput.value = latestTemperatureC;
        }

        // Only append METAR/TAF block if not already present for this airport
        if (!document.getElementById(`metar-${icao}`)) {
          const metarDiv = document.createElement('div');
          metarDiv.id = `metar-${icao}`;
          metarDiv.className = 'bg-gray-100 p-3 rounded border mb-10';
          metarDiv.textContent = ` ${icao}: ${metarData?.raw || 'Unavailable'}`;
          metarSection.appendChild(metarDiv);
          const separator = document.createElement('hr');
          separator.style.border = '1px solid white';
          separator.style.margin = '1rem 0';
          metarSection.appendChild(separator);
        }

        if (!document.getElementById(`taf-${icao}`)) {
          const tafDiv = document.createElement('div');
          tafDiv.id = `taf-${icao}`;
          tafDiv.className = 'bg-gray-100 p-3 rounded border mb-12';
          tafDiv.textContent = ` ${icao}: ${tafData?.raw || 'Unavailable'}`;
          tafSection.appendChild(tafDiv);
          const separator = document.createElement('hr');
          separator.style.border = '1px solid white';
          separator.style.margin = '1rem 0';
          tafSection.appendChild(separator);
        }
      }
      // AIRMET/SIGMET（仅显示一次）
      const sigmetUrl = `https://brief.r1978244759.workers.dev/?url=https://avwx.rest/api/airsigmet?format=json`;
      const airsigmetData = await fetchData(sigmetUrl);
      const airsigDiv = document.createElement('div');
      airsigDiv.className = 'bg-gray-100 p-3 rounded border';
      airsigDiv.textContent = Array.isArray(airsigmetData) && airsigmetData.length
        ? `${airsigmetData.length} active AIRMET/SIGMETs in U.S. FIRs`
        : 'No active AIRMET/SIGMETs';
      airsigmetSection.appendChild(airsigDiv);
    }

    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    if (fetchWeatherBtn) {
      fetchWeatherBtn.addEventListener('click', async () => {
        await displayWeather();
      });
    }

    const calculateDAButton = document.getElementById('calculateDA');
    if (calculateDAButton) {
      calculateDAButton.addEventListener('click', () => {
        const elevation = parseFloat(document.getElementById('fieldElevation').value);
        const temperature = parseFloat(document.getElementById('outsideTemp').value);
        const resultDiv = document.getElementById('daResult');
        if (isNaN(elevation)) {
          resultDiv.textContent = 'Please enter field elevation.';
          return;
        }
        if (!latestAltimeter || isNaN(temperature)) {
          resultDiv.textContent = 'Weather data is missing or invalid. Please click "Fetch Weather" first.';
          return;
        }
        const pressureAltitude = (29.92 - latestAltimeter) * 1000 + elevation;
        const isaTemp = 15 - (2 * (elevation / 1000));
        const da = Math.round(pressureAltitude + (120 * (temperature - isaTemp)));
        resultDiv.textContent = `Estimated Density Altitude: ${da.toLocaleString()} ft (using Altimeter ${latestAltimeter} inHg)`;
      });
    }

    //计算剩余时间
    function getMxRemaining() {
      const mxNow = parseFloat(document.getElementById("mx-now")?.value || 0);
      const mxDue = parseFloat(document.getElementById("mx-due")?.value || 0);
      return (mxDue - mxNow).toFixed(1);
    }

    // --- Risk Assessment Calculation (new version) ---
    function updateRiskScore() {
      let staticScore = 0;
      let dynamicScore = 0;
      // 处理 static-risk，只处理勾选的 checkbox
      document.querySelectorAll('.static-risk:checked').forEach(cb => {
        staticScore += parseInt(cb.value);
      });
      // 处理 dynamic-risk：checkbox + number
      document.querySelectorAll('.dynamic-risk').forEach(input => {
        if (input.type === 'checkbox' && input.checked) {
          dynamicScore += parseInt(input.value);
        } else if (input.type === 'number') {
          dynamicScore += parseInt(input.value) || 0;
        }
      });
      // 特别处理 IMSAFE 数字输入（归类在 static-risk）
      let imsafeValue = parseInt(document.getElementById('imsafe-risk').value) || 0;
      staticScore += imsafeValue;
      let total = staticScore + dynamicScore;
      const riskScoreValue = document.getElementById('riskScoreValue');
      const riskScoreLevel = document.getElementById('riskScoreLevel');
      const riskRecommendation = document.getElementById('riskRecommendation');
      if (riskScoreValue && riskScoreLevel && riskRecommendation) {
        riskScoreValue.textContent = total;
        if (total <= 10) {
          riskScoreLevel.textContent = '🟢 LOW RISK';
          riskScoreLevel.style.color = 'green';
          riskRecommendation.textContent = 'Risk acceptable after discussion. Flight may proceed.';
        } else if (total > 10 && total <= 15) {
          riskScoreLevel.textContent = '🟡 MODERATE RISK';
          riskScoreLevel.style.color = 'orange';
          riskRecommendation.textContent = 'Consult with senior or chief instructor to discuss risk mitigation. May proceed after reduction.';
        } else {
          riskScoreLevel.textContent = '🔴 HIGH RISK';
          riskScoreLevel.style.color = 'red';
          riskRecommendation.textContent = 'Flight requires Chief Pilot approval. Discuss flight plan in detail.';
        }
      }
    }
    document.querySelectorAll('.static-risk, .dynamic-risk').forEach(cb => {
      cb.addEventListener('change', updateRiskScore);
    });
    const imsafeRisk = document.getElementById('imsafe-risk');
    if (imsafeRisk) {
      imsafeRisk.addEventListener('input', updateRiskScore);
    }

    // --- Within Limits Confirmation ---
    function checkWithinLimits() {
      const val = document.getElementById('withinLimitsText').value.trim().toLowerCase();
      const status = document.getElementById('withinLimitsStatus');
      if (status) {
        if (val === "within limits") {
          status.textContent = "✅ Confirmed";
          status.className = "text-green-600 text-sm ml-2";
        } else {
          status.textContent = "❌ Not Confirmed";
          status.className = "text-red-600 text-sm ml-2";
        }
      }
    }
    const withinLimitsInput = document.getElementById('withinLimitsText');
    if (withinLimitsInput) {
      withinLimitsInput.addEventListener('input', checkWithinLimits);
    }

    // ETE Calculation Logic
    function calculateETE() {
      const etd = document.getElementById('etd').value;
      const eta = document.getElementById('eta').value;
      const eteField = document.getElementById('ete');
      if (etd && eta) {
        const [etdH, etdM] = etd.split(':').map(Number);
        const [etaH, etaM] = eta.split(':').map(Number);
        let etdMinutes = etdH * 60 + etdM;
        let etaMinutes = etaH * 60 + etaM;
        // Handle next-day arrival
        if (etaMinutes < etdMinutes) {
          etaMinutes += 24 * 60;
        }
        const eteMinutes = etaMinutes - etdMinutes;
        const eteHoursDecimal = (eteMinutes / 60).toFixed(2);
        eteField.value = eteHoursDecimal;
      } else {
        eteField.value = '';
      }
    }
    const etdInput = document.getElementById('etd');
    const etaInput = document.getElementById('eta');
    if (etdInput) etdInput.addEventListener('change', calculateETE);
    if (etaInput) etaInput.addEventListener('change', calculateETE);

    // Generate Flight Brief Report Button Logic
    const generateReportBtn = document.getElementById("generateReportBtn");
    if (generateReportBtn) {
      generateReportBtn.addEventListener("click", function () {
        // Check for within limits confirmation
        const withinLimitsInput = document.getElementById('withinLimitsText').value.trim().toLowerCase();
        if (withinLimitsInput !== "within limits") {
          alert("Please enter 'within limits' to confirm weight & CG limits.");
          return;
        }
        // Gather required info
        const pilotName = document.getElementById("studentName")?.value || '';
        const instructorName = document.getElementById("instructorName")?.value || '';
        const date = document.getElementById("flightDate")?.value || '';
        const tailNumber = document.getElementById("aircraftId")?.value || '';
        const fuelOnBoard = document.getElementById("fuel")?.value || '';
        const dep = document.getElementById("departure")?.value || '';
        const arr = document.getElementById("arrival")?.value || '';
        const eta = document.getElementById("eta")?.value || '';
        const etd = document.getElementById("etd")?.value || '';
        const lessonPractice = document.getElementById("lessonPractice")?.value || '';
        const da = document.getElementById("daResult")?.textContent || '';
        const wnbGross = document.getElementById("grossWeight")?.value || '';
        const wnbFuelTime = document.getElementById("fuelTime")?.value || '';
        const weatherNotes = document.getElementById("weatherNotes")?.value || '';
        const riskComments = document.getElementById("riskComments")?.value || '';
        // 1. Flight Rules
        const flightRulesSel = document.getElementById('flight-rules');
        const flightRules = flightRulesSel ? flightRulesSel.options[flightRulesSel.selectedIndex].value : '';
        // 2. ETD, ETA, ETE
        // ETE: recalculate here to be sure
        let eteStr = '';
        if (etd && eta) {
          const [etdH, etdM] = etd.split(':').map(Number);
          const [etaH, etaM] = eta.split(':').map(Number);
          let etdMinutes = etdH * 60 + etdM;
          let etaMinutes = etaH * 60 + etaM;
          if (etaMinutes < etdMinutes) etaMinutes += 24 * 60;
          const eteMinutes = etaMinutes - etdMinutes;
          const eteHoursDecimal = (eteMinutes / 60).toFixed(2);
          eteStr = eteHoursDecimal;
        }
        // 3. Static Risk & Dynamic Risk
        // Static Risk: checkboxes
        const staticRiskCheckboxes = Array.from(document.querySelectorAll('.static-risk[type="checkbox"]'));
        let staticRiskItems = [];
        let staticRiskScore = 0;
        staticRiskCheckboxes.forEach(cb => {
          if (cb.checked) {
            const label = cb.parentElement.querySelector('label');
            staticRiskItems.push(`- ${label ? label.textContent.replace(/:$/, '') : cb.name} [${cb.value}]`);
            staticRiskScore += parseInt(cb.value);
          }
        });
        // IMSAFE
        const imsafeValue = parseInt(document.getElementById('imsafe-risk').value) || 0;
        staticRiskScore += imsafeValue;
        // Dynamic Risk: checkboxes and number
        const dynamicRiskCheckboxes = Array.from(document.querySelectorAll('.dynamic-risk[type="checkbox"]'));
        let dynamicRiskItems = [];
        let dynamicRiskScore = 0;
        dynamicRiskCheckboxes.forEach(cb => {
          if (cb.checked) {
            const label = cb.parentElement.querySelector('label');
            dynamicRiskItems.push(`- ${label ? label.textContent.replace(/:$/, '') : cb.name} [${cb.value}]`);
            dynamicRiskScore += parseInt(cb.value);
          }
        });
        // "Other Risks" (number input in dynamic-risk)
        let otherRisksValue = 0;
        document.querySelectorAll('.dynamic-risk[type="number"]').forEach(input => {
          const val = parseInt(input.value) || 0;
          if (val > 0) {
            const label = input.parentElement.querySelector('label');
            dynamicRiskItems.push(`- ${label ? label.textContent.replace(/:$/, '') : input.name} [${val}]`);
            otherRisksValue += val;
            dynamicRiskScore += val;
          }
        });
        // 4. IMSAFE & Other Risks (already included above)
        // riskScore, riskCategory, riskAdvice
        const riskScore = staticRiskScore + dynamicRiskScore;
        let riskCategory = '';
        let riskAdvice = '';
        if (riskScore <= 10) {
          riskCategory = '🟢 LOW RISK';
          riskAdvice = 'Risk acceptable after discussion. Flight may proceed.';
        } else if (riskScore > 10 && riskScore <= 15) {
          riskCategory = '🟡 MODERATE RISK';
          riskAdvice = 'Consult with senior or chief instructor to discuss risk mitigation. May proceed after reduction.';
        } else {
          riskCategory = '🔴 HIGH RISK';
          riskAdvice = 'Flight requires Chief Pilot approval. Discuss flight plan in detail.';
        }
        // Compose printable report
        let reportText = `=== PilotSeal Flight Brief Report ===

PF: ${pilotName}
PIC: ${instructorName}
Date: ${date}
Aircraft: ${tailNumber}
Fuel: ${fuelOnBoard}

Flight Rules: ${flightRules}

ETD: ${etd}
ETA: ${eta}
ETE: ${eteStr ? eteStr + ' hours' : ''}

Departure: ${dep}
Arrival: ${arr}
Lesson Practice: ${lessonPractice}

📝 Notes / NOTAMs:
${weatherNotes}

Density Altitude: ${da}
Gross Weight: ${wnbGross}
Fuel Time: ${wnbFuelTime}
Mx Remaining:${getMxRemaining()}

🪨 Static Risk:
${staticRiskItems.length ? staticRiskItems.join('\n') : '- None'}
Total Static Risk Score: ${staticRiskScore}

🌪️ Dynamic Risk:
${dynamicRiskItems.length ? dynamicRiskItems.join('\n') : '- None'}
Total Dynamic Risk Score: ${dynamicRiskScore}

IMSAFE: ${imsafeValue}
Other Risks: ${otherRisksValue}

Total Risk Score: ${riskScore}
Category: ${riskCategory}
Advice: ${riskAdvice}

🗒️ Risk Discussion / Comments:
${riskComments}
`;
        // Use a print area if exists, otherwise open new window
        let printArea = document.querySelector('.print-area');
        if (!printArea) {
          // fallback: open new window for print
          const reportWindow = window.open("", "_blank");
          reportWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>PilotSeal Flight Brief Report</title>
              <style>
                body { font-family: 'Consolas', 'Menlo', 'Monaco', monospace; white-space: pre-wrap; margin: 2em; }
                h1 { font-size: 1.6em; font-weight: bold; margin-bottom: 1em; }
              </style>
            </head>
            <body>
              <pre>${reportText.replace(/</g, '&lt;')}</pre>
              
            </body>
            </html>
          `);
          reportWindow.document.close();
        } else {
          printArea.innerText = reportText;
          //window.print();
        }
      });
    }
  }, []);

  return (
    <div className="flightbrief-body">
      <div className="flight-section">
        <h1 className="text-3xl font-bold text-center mb-6">✈️ Flight Brief</h1>
        <hr className="dived-line"/>
        <h2 className="text-xl font-bold mb-4">📓Information</h2>
        <form className="space-y-4">
          <div className="inline-label-input">
            <label className="label" htmlFor="studentName">Student Name(Pilot Flying):</label>
            <input type="text" id="studentName" className="input-field" required />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="instructorName">Instructor Name(Pilot In Command):</label>
            <input type="text" id="instructorName" className="input-field" required />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="flight-rules">Flight Rules:</label>
            <select id="flight-rules" className="input-field" title="Select flight rules">
              <option value="VFR">VFR</option>
              <option value="IFR">IFR</option>
            </select>
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="flightDate">Select Date</label>
            <input type="date" id="flightDate" className="input-field" required placeholder="Select date" title="Select date" lang="en" />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="etd">Estimated Time of Departure (ETD)</label>
            <input type="time" id="etd" className="input-field" required placeholder="Select time" title="Select time" />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="eta">Estimated Time of Arrival (ETA)</label>
            <input type="time" id="eta" className="input-field" required placeholder="Select time" title="Select time" />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="ete">Estimated Time Enroute (ETE)</label>
            <input type="text" id="ete" className="input-field" readOnly placeholder="Auto-calculated" title="Calculated ETE" />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="aircraftId">Aircraft Tail Number:</label>
            <input type="text" id="aircraftId" className="input-field" required />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="fuel">Fuel Onboard (Gallons):</label>
            <input type="number" id="fuel" className="input-field" required />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="fuelTime">Fuel Time (hrs):</label>
            <input type="number" id="fuelTime" className="input-field" placeholder="e.g. 2.5" />
          </div>
          <hr className="dived-line"/>
          <h2 className="text-xl font-bold mb-4">🛫 Route</h2>
          <div className="inline-label-input">
            <label className="label" htmlFor="departure">Departure Point:</label>
            <input type="text" id="departure" className="input-field" required />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button type="button" id="btnCross" className="btn-toggle">Cross Country</button>
            <button type="button" id="btnLocal" className="btn-toggle">Local Practice</button>
          </div>
          <div id="crossCountryFields" className="space-y-3 mt-4 hidden" hidden>
            <label className="label">Intermediate Stop</label>
            <div className="flex items-center gap-2">
              <input type="text" name="stop[]" className="stop-input input-field" />
              <button type="button" className="remove-stop text-red-500 font-bold">✕</button>
            </div>
            <button type="button" id="addStop" className="text-blue-600 underline text-sm">+ Add Another Stop</button>
          </div>
          <div className="inline-label-input mt-4">
            <label className="label" htmlFor="arrival">Arrival Point:</label>
            <input type="text" id="arrival" className="input-field" required />
          </div>
          <div className="section inline-label-input">
            <label className="label" htmlFor="lessonPractice"><strong>✏️ Lesson Practice:</strong></label>
            <input type="text" id="lessonPractice" className="input-field" placeholder="e.g., Steep Turns, Slow Flight, Short Field Landing"/>
          </div>
        </form>
      <hr className="dived-line"/>
      <h2 className="text-xl font-bold mb-4">🌦️ Weather Information</h2>
      <div id="weather-section" className="space-y-6">
        <div className="text-center">
          <button id="fetchWeatherBtn" type="button" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Fetch Weather
          </button>
        </div>
        <div>
          <h3>🟢 METAR</h3>
          <div id="metar-section" className="space-y-2"></div>
        </div>
        <div>
          <h3>🟡 TAF</h3>
          <div id="taf-section" className="space-y-2"></div>
        </div>
        <div>
          <h3>🔴 AIRMET/SIGMET</h3>
          <div id="airsigmet-section" className="space-y-2"></div>
        </div>
        <div>
          <h3 className="section-subtitle">📏 Density Altitude (DA)</h3>
          <div className="inline-label-input">
            <label className="label" htmlFor="fieldElevation">Field Elevation (ft)</label>
            <input type="number" id="fieldElevation" className="input-field" placeholder="e.g. 2500" />
          </div>
          <div className="inline-label-input">
            <label className="label" htmlFor="outsideTemp">Outside Air Temperature (°C)</label>
            <input type="number" id="outsideTemp" className="input-field" readOnly />
          </div>
          <button type="button" id="calculateDA" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2">
            Calculate DA
          </button>
          <div id="daResult" className="text-sm text-gray-700 font-medium mt-2"></div>
        </div>
      </div>
      {/* Notes / NOTAMs section inserted after weather information, before Weight & Balance */}
      <div className="section inline-label-input">
        <label className="label" htmlFor="weatherNotes"><strong>📝 Notes / NOTAMs</strong></label>
        <textarea id="weatherNotes" rows="3" className="input-field" placeholder="Enter NOTAMs, ATIS, or other relevant notes here..."></textarea>
      </div>
      <hr className="dived-line"/>
      <h2 className="text-xl font-bold mb-4">⚖️ Aircraft Conditions</h2>
      <div className="space-y-4">
        <div className="inline-label-input">
          <label className="label" htmlFor="grossWeight">Total Gross Weight (lbs):</label>
          <input type="number" id="grossWeight" className="input-field" placeholder="e.g. 2400" />
        </div>
        <div className="inline-label-input">
          <label className="label" htmlFor="withinLimitsText">Enter "within limits" to confirm:</label>
          <input type="text" id="withinLimitsText" className="input-field" placeholder="within limits" />
          <span id="withinLimitsStatus" className="text-sm ml-2"></span>
        </div>
        <div className="inline-label-input">
          <label className="label" htmlFor="mx-now">Mx Time Now:</label>
          <input type="number" id="mx-now" className="input-field" placeholder="Check Aircraft" />
        </div>
        <div className="inline-label-input">
          <label className="label" htmlFor="mx-due">Next Mx Due:</label>
          <input type="number" id="mx-due" className="input-field" placeholder="Next 100 hr/annual eg." />
        </div>
      </div>
      <hr className="dived-line"/>
      <h2>🧭 Risk Assessment</h2>
      <div className="risk-columns">
        <div className="static-risk-column">
          <h3>🪨 Static Risk</h3>
          <div className="risk-item">
            <label htmlFor="static-dual-flight">Dual flight:</label>
            <input type="checkbox" className="static-risk" value="1" id="static-dual-flight" name="static-dual-flight" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-training-pre-solo">Training Pre-solo student:</label>
            <input type="checkbox" className="static-risk" value="3" id="static-training-pre-solo" name="static-training-pre-solo" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-solo-student">SOLO student:</label>
            <input type="checkbox" className="static-risk" value="3" id="static-solo-student" name="static-solo-student" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-dpe-check">DPE or Check flight:</label>
            <input type="checkbox" className="static-risk" value="2" id="static-dpe-check" name="static-dpe-check" />
          </div>
          <div className="risk-item">
            <label htmlFor="imsafe-risk">IMSAFE (each factor counts 1):</label>
            <input type="number" id="imsafe-risk" name="imsafe-risk" min="0" max="6" defaultValue="0" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-first-fly-fi">First fly with FI:</label>
            <input type="checkbox" className="static-risk" value="1" id="static-first-fly-fi" name="static-first-fly-fi" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-different-model">Different model:</label>
            <input type="checkbox" className="static-risk" value="1" id="static-different-model" name="static-different-model" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-last-flight-30">Last flight &gt;30 days:</label>
            <input type="checkbox" className="static-risk" value="1" id="static-last-flight-30" name="static-last-flight-30" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-acft-time-40">Aircraft time &lt; 40 hours (Rated):</label>
            <input type="checkbox" className="static-risk" value="1" id="static-acft-time-40" name="static-acft-time-40" />
          </div>
          <div className="risk-item">
            <label htmlFor="static-fi-dual-200">FI &lt; 200 hours Dual given:</label>
            <input type="checkbox" className="static-risk" value="1" id="static-fi-dual-200" name="static-fi-dual-200" />
          </div>
        </div>
        <div className="dynamic-risk-column">
          <h3>🌪️ Dynamic Risk</h3>
          <div className="risk-item">
            <label htmlFor="dynamic-night-ops">Night ops:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="dynamic-night-ops" name="dynamic-night-ops" />
          </div>
          <div className="risk-item">
            <label htmlFor="dynamic-last-night-30">Last night &gt;30 days:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="dynamic-last-night-30" name="dynamic-last-night-30" />
          </div>
          <div className="risk-item">
            <label htmlFor="dynamic-svfr">SVFR:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="dynamic-svfr" name="dynamic-svfr" />
          </div>
          <div className="risk-item">
            <label htmlFor="dynamic-gust-spread">Gust spread &gt; 13 kt:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="dynamic-gust-spread" name="dynamic-gust-spread" />
          </div>
          <div className="risk-item">
            <label htmlFor="dynamic-other-fi-cancel">Other FI cancellation due to WX:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="dynamic-other-fi-cancel" name="dynamic-other-fi-cancel" />
          </div>
          <div className="risk-item">
            <label htmlFor="dynamic-max-fuel-flight">Max fuel flight:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="dynamic-max-fuel-flight" name="dynamic-max-fuel-flight" />
          </div>
          {/* 新增 Full down auto 选项 */}
          <div className="risk-item">
            <label htmlFor="full-down-auto">Full down auto:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="full-down-auto" name="full-down-auto" />
          </div>
          <div className="risk-item">
            <label htmlFor="dynamic-stall-training">STALL Training:</label>
            <input type="checkbox" className="dynamic-risk" value="1" id="dynamic-stall-training" name="dynamic-stall-training" />
          </div>
          <div className="risk-item">
            <label htmlFor="dynamic-spin-training">SPIN Training:</label>
            <input type="checkbox" className="dynamic-risk" value="2" id="dynamic-spin-training" name="dynamic-spin-training" />
          </div>
          <div className="risk-item">
            <label htmlFor="other-risk">Other Risks:</label>
            <input type="number" className="dynamic-risk" name="other-risk" min="0" max="5" defaultValue="0" />
          </div>
        </div>
      </div>
      {/* Risk Discussion / Comments section at page bottom */}
      <div className="section inline-label-input">
        <label className="label" htmlFor="riskComments"><strong>🗒️ Risk Discussion / Comments</strong></label>
        <textarea id="riskComments" rows="3" className="input-field" placeholder="Notes from discussion with senior/chief pilot..."></textarea>
      </div>
      <div id="totalRiskScore" style={{ fontWeight: "bold", marginTop: "10px" }}>
        Total Risk Score: <span id="riskScoreValue">0</span>
        <span id="riskScoreLevel" style={{ marginLeft: "15px", fontWeight: "bold" }}></span>
        <div id="riskRecommendation" style={{ marginTop: "5px", fontStyle: "italic" }}></div>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button id="generateReportBtn" type="button">Generate Flight Brief Report</button>
      </div>
    </div>
    </div>
  );
}

export default FlightBrief;