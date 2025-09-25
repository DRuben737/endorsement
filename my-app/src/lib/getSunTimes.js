import SunCalc from 'suncalc';
import { DateTime } from 'luxon';
import { getLatLongFromLocation as geocodeLocation } from './geocodeUtils';

export async function getSunTimes(locationOrLat, lonOrDate, maybeDate) {
  let latitude, longitude, dateInput;

  if (typeof locationOrLat === 'string' && !maybeDate) {
    throw new Error('Missing date input for location-based query');
  }

  if (typeof locationOrLat === 'string') {
    const coords = await geocodeLocation(locationOrLat);
    if (!coords) {
      throw new Error('Could not resolve location to coordinates');
    }
    latitude = coords.lat;
    longitude = coords.lon;
    dateInput = lonOrDate;
  } else {
    latitude = locationOrLat;
    longitude = lonOrDate;
    dateInput = maybeDate;
  }

  if (!latitude || !longitude || !dateInput) {
    throw new Error('Missing latitude, longitude, or date');
  }

  const date = typeof dateInput === 'string'
    ? DateTime.fromISO(dateInput).toJSDate()
    : DateTime.fromJSDate(dateInput).toJSDate();

  const times = SunCalc.getTimes(date, latitude, longitude);

  const toLocal = (dt) => DateTime.fromJSDate(dt).toLocaleString(DateTime.TIME_SIMPLE);

  return {
    sunrise: toLocal(times.sunrise),
    sunset: toLocal(times.sunset),
    civilTwilightBegin: toLocal(times.dawn),
    civilTwilightEnd: toLocal(times.dusk),
    raw: {
      sunrise: times.sunrise,
      sunset: times.sunset,
      civilTwilightBegin: times.dawn,
      civilTwilightEnd: times.dusk,
    },
  };
}