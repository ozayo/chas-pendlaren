import React, { useState } from 'react';

function LocationButton({ onLocationObtained }) {
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationObtained(position.coords);
        setError(null);
      },
      () => {
        setError('Unable to retrieve your location');
      }
    );
  };

  return (
    <div>
      <button onClick={getLocation}>Find Nearest Stops</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LocationButton;
