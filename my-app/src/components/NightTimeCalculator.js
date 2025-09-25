import React, { useState } from 'react';
import { getSunTimes } from '../lib/getSunTimes';
import { geocodeLocation } from '../lib/geocodeLocation';
import '../css/Nighttime.css';
import { DateTime } from 'luxon';

const NightTimeCalculator = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [zone, setZone] = useState(null);
  const [sunToday, setSunToday] = useState(null);
  const [sunNext, setSunNext] = useState(null);

  const handleCalculate = async () => {
    if (!location || !date) return;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      setSunToday(null);
      setSunNext(null);
      setZone(null);
      return;
    }

    setLoading(true);
    try {
      const geocodeResult = await geocodeLocation(location);
      const { lat, lon } = geocodeResult;

      const nextDate = new Date(parsedDate);
      nextDate.setDate(nextDate.getDate() + 1);

      const timezonePromise = fetch(`https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`)
        .then(res => res.json())
        .catch(() => null);

      const sunTodayPromise = getSunTimes(lat, lon, parsedDate);
      const sunNextPromise = getSunTimes(lat, lon, nextDate);

      const [timezoneData, sunTodayData, sunNextData] = await Promise.all([
        timezonePromise,
        sunTodayPromise,
        sunNextPromise,
      ]);

      if (timezoneData && timezoneData.timeZone) {
        setZone(timezoneData.timeZone);
      } else {
        setZone(null);
      }

      setSunToday(sunTodayData);
      setSunNext(sunNextData);
    } catch (error) {
      console.error('Failed to fetch sun times:', error);
      setSunToday(null);
      setSunNext(null);
      setZone(null);
    } finally {
      setLoading(false);
    }
  };

  const formatLocalTime = (dt, zone) => {
    if (!dt || !zone) return 'N/A';
    const dtLux = DateTime.fromJSDate(dt, { zone });
    if (!dtLux.isValid) return 'N/A';
    const utc = dtLux.toUTC();
    const tzAbbr = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    }).format(dtLux.toJSDate()).split(' ').pop();
    return `${dtLux.toFormat('hh:mm a')} ${tzAbbr} (${utc.toFormat('HH:mm')}Z)`;
  };

  // Helper to add hours to a Date object
  const addHours = (date, hours) => {
    return new Date(date.getTime() + hours * 3600 * 1000);
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
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? 'Loading...' : 'Calculate'}
      </button>

      {(sunToday && sunNext && zone) && (
        <div className="results">
          <div className="highlight-cards">
            <div className="card lights">
              💡 Sunset <br />
              <strong>
                {formatLocalTime(sunToday.raw.sunset, zone)}
              </strong>
            </div>
            <div className="card night">
              🌙 Civil Dusk <br />
              <strong>
                {formatLocalTime(sunToday.raw.civilDusk, zone)}
              </strong>
            </div>
            <div className="card currency">
              👥 Hour after Sunset <br />
              <strong>
                {formatLocalTime(addHours(sunToday.raw.sunset, 1), zone)}
              </strong>
            </div>
          </div>

          <div className="details">
            <p>
              In accordance with 14 CFR §91.209, position lights must be on from sunset {formatLocalTime(sunToday.raw.sunset, zone)} to sunrise {formatLocalTime(sunNext.raw.sunrise, zone)}, and anticollision lights must be used during all operations (with limited exceptions).
            </p>
            <p>
              According to 14 CFR §1.1, "night" is defined as the time after the end of evening civil twilight {formatLocalTime(sunToday.raw.civilDusk, zone)} and before morning civil twilight {formatLocalTime(sunNext.raw.civilDawn, zone)}.
             
            </p>
            <p>
              Per 14 CFR §61.57(b), to carry passengers at night, the pilot must have completed three takeoffs and landings to a full stop during the period between one hour after sunset {formatLocalTime(addHours(sunToday.raw.sunset, 1), zone)} and one hour before sunrise {formatLocalTime(addHours(sunNext.raw.sunrise, -1), zone)}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NightTimeCalculator;