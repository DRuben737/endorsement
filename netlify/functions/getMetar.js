const fetch = require('node-fetch');
const xml2js = require('xml2js');

exports.handler = async (event) => {
  const icaoRaw = event.queryStringParameters.icao || '';
  const icao = icaoRaw.length === 3 ? `K${icaoRaw.toUpperCase()}` : icaoRaw.toUpperCase();

  const url = `https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=${icao}&hoursBeforeNow=1`;

  try {
    const response = await fetch(url);
    const xml = await response.text();

    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
    const metars = result.response.data[0].METAR;

    if (!metars || metars.length === 0) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'No METAR data found.' }),
      };
    }

    const metar = metars[0].raw_text[0];

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ metar }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};