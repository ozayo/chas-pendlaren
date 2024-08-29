import React, { useState } from 'react';
import LocationButton from './components/LocationButton';
import StopsList from './components/StopsList';
import './App.css';

function App() {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationObtained = (coords) => {
    setUserLocation(coords);
    console.log('User Location:', coords); // Console üzerinde konumu görebilirsiniz.
  };

  return (
    <div>
      <h1>Welcome to Pendlaren</h1>
      <LocationButton onLocationObtained={handleLocationObtained} />
      {/* {userLocation && <p>Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}</p>} */}
      {userLocation && <StopsList coords={userLocation} />}
    </div>
  );
}

export default App;

