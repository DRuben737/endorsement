import React, { useState } from 'react';
import { getSunTimes } from '../lib/getSunTimes';
import { generateNightOpsText } from '../lib/aviationNightRules';
import { geocodeLocation } from '../lib/geocodeLocation';
import '../css/Nighttime.css';

const NightTimeCalculator = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [nightOpsText, setNightOpsText] = useState(null);

  const handleCalculate = async () => {
    if (!location || !date) return;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      setNightOpsText('Invalid date format.');
      return;
    }

    try {
      const { lat, lon } = await geocodeLocation(location);
      const times = await getSunTimes(lat, lon, parsedDate);

      const text = generateNightOpsText({ ...times.raw, date: parsedDate });
      setNightOpsText(text);
    } catch (error) {
      console.error('Failed to fetch sun times:', error);
      setNightOpsText('Error fetching data.');
    }
  };

  // Helper to parse a "HH:MM" time string into a Date object for the given date
  const parseTimeOnDate = (dateObj, timeStr) => {
    if (!dateObj || !timeStr) return null;
    // timeStr can be "HH:MM" or "HH:MMZ"
    const m = timeStr.match(/^(\d{1,2}):(\d{2})(Z)?$/);
    if (!m) return null;
    const hours = parseInt(m[1], 10);
    const minutes = parseInt(m[2], 10);
    if (m[3] === 'Z') {
      // Zulu time: construct date in UTC
      return new Date(Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate(), hours, minutes));
    } else {
      // Local time: construct date in local time
      return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), hours, minutes);
    }
  };

  // Helper to extract the first time (HH:MM) inside parentheses and return as {local, utc}
  const extractAndFormatTime = (text, dateObj) => {
    if (!text || typeof text !== 'string') return 'N/A';
    const m = text.match(/\((\d{1,2}:\d{2})\)/);
    if (!m) return 'N/A';
    const localDate = parseTimeOnDate(dateObj, m[1]);
    if (!localDate) return m[1];
    // Format local time
    const localStr = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // Format UTC (Zulu)
    const utcStr = localDate.toISOString().substr(11,5); // HH:MM
    return `${localStr} (${utcStr}Z)`;
  };

  // For night currency, sometimes just "HH:MM" without parentheses
  const extractAndFormatCurrencyTime = (text, dateObj) => {
    if (!text || typeof text !== 'string') return 'N/A';
    const m = text.match(/(\d{1,2}:\d{2})/);
    if (!m) return 'N/A';
    const localDate = parseTimeOnDate(dateObj, m[1]);
    if (!localDate) return m[1];
    const localStr = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const utcStr = localDate.toISOString().substr(11,5);
    return `${localStr} (${utcStr}Z)`;
  };

  return (
    <div className="night-time-calculator">
      <h3>Put your location(For example:KPDX), and select the date you're checking if not today to start calculation.</h3>
      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>

      {nightOpsText && (
        <div className="results">
          {typeof nightOpsText === 'object' ? (
            <>
              <div className="highlight-cards">
                <div className="card lights">
                  💡 Lights Use <br />
                  <strong>
                    {
                      /\(\d{1,2}:\d{2}\)/.test(nightOpsText.lightingRequirements)
                        ? extractAndFormatTime(nightOpsText.lightingRequirements, new Date(date))
                        : extractAndFormatCurrencyTime(nightOpsText.lightingRequirements, new Date(date))
                    }
                  </strong>
                </div>
                <div className="card night">
                  🌙 Night Time Begins <br />
                  <strong>
                    {
                      /\(\d{1,2}:\d{2}\)/.test(nightOpsText.nightDefinition)
                        ? extractAndFormatTime(nightOpsText.nightDefinition, new Date(date))
                        : extractAndFormatCurrencyTime(nightOpsText.nightDefinition, new Date(date))
                    }
                  </strong>
                </div>
                <div className="card currency">
                  👥 Night Currency Begins <br />
                  <strong>
                    {extractAndFormatCurrencyTime(nightOpsText.nightCurrency, new Date(date))}
                  </strong>
                </div>
              </div>

              <div className="details">
                <p>
                  {nightOpsText.lightingRequirements
                    ? nightOpsText.lightingRequirements.replaceAll(
                        /\((\d{1,2}:\d{2})\)/g,
                        (_, t) => {
                          const formatted = extractAndFormatTime(`(${t})`, new Date(date));
                          return formatted ? formatted : `(${t})`;
                        }
                      )
                    : ''}
                </p>
                <p>
                  {nightOpsText.nightDefinition
                    ? nightOpsText.nightDefinition.replaceAll(
                        /\((\d{1,2}:\d{2})\)/g,
                        (_, t) => {
                          const formatted = extractAndFormatTime(`(${t})`, new Date(date));
                          return formatted ? formatted : `(${t})`;
                        }
                      )
                    : ''}
                </p>
                <p>
                  {nightOpsText.nightCurrency
                    ? nightOpsText.nightCurrency.replaceAll(
                        /(\d{1,2}:\d{2})/g,
                        (t) => {
                          const formatted = extractAndFormatCurrencyTime(t, new Date(date));
                          return formatted ? formatted : t;
                        }
                      )
                    : ''}
                </p>
                
              </div>
            </>
          ) : (
            <p>{nightOpsText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NightTimeCalculator;