import { DateTime } from "luxon";

/**
 * Generates textual descriptions for aviation night operations.
 * @param {Object} params
 * @param {Date|string} params.sunrise - Sunrise time as Date or string.
 * @param {Date|string} params.sunset - Sunset time as Date or string.
 * @param {Date|string} params.civilTwilightBegin - Civil twilight begin as Date or string.
 * @param {Date|string} params.civilTwilightEnd - Civil twilight end as Date or string.
 * @param {string|Date} params.date - Date string in ISO format or Date object.
 * @param {string} [params.locationName] - Optional location name for context.
 * @returns {Object} Object with three fields: nightDefinition, nightCurrency, lightingRequirements.
 */
export function generateNightOpsText({ sunrise, sunset, civilTwilightBegin, civilTwilightEnd, date, locationName = "this location" }) {
  const baseDate = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);

  const fmt = "h:mm a";
  const parse = (t) => {
    if (t instanceof Date) {
      return DateTime.fromJSDate(t);
    } else if (typeof t === "string") {
      return DateTime.fromFormat(t, fmt, { zone: "local" }).set({
        year: baseDate.year,
        month: baseDate.month,
        day: baseDate.day,
      });
    } else {
      throw new Error("Invalid time value provided to generateNightOpsText");
    }
  };

  const tSunrise = parse(sunrise);
  const tSunset = parse(sunset);
  const tTwilightBegin = parse(civilTwilightBegin);
  const tTwilightEnd = parse(civilTwilightEnd);

  const lightingRequirements = `In accordance with 14 CFR §91.209, position lights must be on from sunset ${tSunset.toLocaleString(DateTime.TIME_SIMPLE)} to sunrise ${tSunrise.toLocaleString(DateTime.TIME_SIMPLE)}, and anticollision lights must be used during all operations (with limited exceptions).`;

  const nightDefinition = `According to 14 CFR §1.1, "night" is defined as the time after the end of evening civil twilight ${tTwilightEnd.toLocaleString(DateTime.TIME_SIMPLE)} and before morning civil twilight ${tTwilightBegin.toLocaleString(DateTime.TIME_SIMPLE)}.`;

  const nightCurrency = `Per 14 CFR §61.57(b), to carry passengers at night, the pilot must have completed three takeoffs and landings to a full stop during the period between one hour after sunset ${tSunset.plus({ hours: 1 }).toLocaleString(DateTime.TIME_SIMPLE)} and one hour before sunrise ${tSunrise.minus({ hours: 1 }).toLocaleString(DateTime.TIME_SIMPLE)}.`;

  return {
    nightDefinition,
    nightCurrency,
    lightingRequirements,
  };
}