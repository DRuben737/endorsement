import React, { useEffect } from 'react';

const FlightBrief = () => {
  useEffect(() => {
    window.open('/flight-brief.html', '_blank', 'noopener,noreferrer');
    window.location.href = '/';
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 text-center">
      <h1 className="text-2xl">正在打开 Flight Brief 页面...</h1>
    </div>
  );
};

export default FlightBrief;