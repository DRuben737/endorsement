

/**
 * @typedef {Object} SunTimes
 * @property {string} sunrise - ISO string of local sunrise time
 * @property {string} sunset - ISO string of local sunset time
 * @property {string} civilTwilightBegin - ISO string of local civil twilight begin
 * @property {string} civilTwilightEnd - ISO string of local civil twilight end
 * @property {string} solarNoon - ISO string of local solar noon time
 * @property {string} dayLength - Length of the day in HH:MM:SS
 */

/** @type {SunTimes} */
export const exampleSunTimes = {
  sunrise: "2025-09-24T06:45:00-07:00",
  sunset: "2025-09-24T19:10:00-07:00",
  civilTwilightBegin: "2025-09-24T06:15:00-07:00",
  civilTwilightEnd: "2025-09-24T19:40:00-07:00",
  solarNoon: "2025-09-24T12:57:00-07:00",
  dayLength: "12:25:00"
};