const fetch = require('node-fetch');
const { parseStringPromise } = require('xml2js');

exports.handler = async (event) => {
  const icaoRaw = event.queryStringParameters.icao || '';
  const icao = icaoRaw.length === 3 ? `K${icaoRaw.toUpperCase()}` : icaoRaw.toUpperCase();

  const url = `https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=${icao}&hoursBeforeNow=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MetarFetcher/1.0)'
      }
    });

    const xml = await response.text();
    const result = await parseStringPromise(xml);

    const metarData = result.response.data[0].METAR?.[0];
    const metar = metarData?.raw_text?.[0] || 'No METAR found.';

    // TAF is not available via this endpoint — recommend adding separate request if needed

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ metar, taf: 'TAF not available via FAA METAR feed.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};