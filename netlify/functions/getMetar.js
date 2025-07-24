const fetch = require('node-fetch');

exports.handler = async (event) => {
  const icaoRaw = event.queryStringParameters.icao || '';
  const icao = icaoRaw.length === 3 ? `K${icaoRaw.toUpperCase()}` : icaoRaw.toUpperCase();

  const url = `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${icao}&format=raw&hours=0&taf=on`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    const lines = text.split('\n');
    let metar = 'No METAR found.';
    let taf = 'No TAF found.';

    for (const line of lines) {
      if (line.startsWith('METAR')) metar = line.trim();
      if (line.startsWith('TAF')) taf = line.trim();
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // 为前端调试提供 CORS 支持
      },
      body: JSON.stringify({ metar, taf }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};