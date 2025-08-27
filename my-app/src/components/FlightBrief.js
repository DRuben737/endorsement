import React, { useEffect } from 'react';

const FlightBrief = () => {
  useEffect(() => {
    document.title = 'Brief - PilotSeal';
  }, []);

  return (
    <iframe
      src="/flight-brief.html"
      title="Flight Brief"
      style={{
        border: 'none',
        width: '100%',
        height: '100vh',
      }}
    />
  );
};

export default FlightBrief;