const fetch = require('node-fetch');
const xml2js = require('xml2js');

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event) => {
  const icaoRaw = event.queryStringParameters.icao || '';
  const icao = icaoRaw.length === 3 ? `K${icaoRaw.toUpperCase()}` : icaoRaw.toUpperCase();

  // METAR URL
  const metarUrl = `https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=${icao}&hoursBeforeNow=1`;

  // TAF URL
  const tafUrl = `https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=${icao}&hoursBeforeNow=1`;

  try {
    // Fetch METAR
    const metarResponse = await fetch(metarUrl);
    const metarXml = await metarResponse.text();
    const metarResult = await xml2js.parseStringPromise(metarXml, { mergeAttrs: true });
    const metars = metarResult.response?.data?.[0]?.METAR;
    const metar = metars?.[0]?.raw_text?.[0] || 'No METAR data found.';

    // Fetch TAF
    const tafResponse = await fetch(tafUrl);
    const tafXml = await tafResponse.text();
    const tafResult = await xml2js.parseStringPromise(tafXml, { mergeAttrs: true });
    const tafs = tafResult.response?.data?.[0]?.TAF;
    const taf = tafs?.[0]?.raw_text?.[0] || 'No TAF data found.';

    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify({ metar, taf }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: defaultHeaders,
      body: JSON.stringify({ error: error.message }),
    };
  }
};