// src/components/Logbook.js

const Logbook = () => {
  const handleRedirect = () => {
    window.location.href = "https://logbook.pilotseal.com";
  };

  return (
    <div>
      <button onClick={handleRedirect}>Go to Logbook</button>
    </div>
  );
};

export default Logbook;