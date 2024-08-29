import React, { useState, useEffect } from 'react';
import DeparturesList from './DeparturesList'; // show stops time tabel

function StopsList({ coords }) {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //Select stop and show time table update
  const [selectedStopId, setSelectedStopId] = useState(null); // selected stop 
  const handleStopSelect = (id) => {
    setSelectedStopId(id);
  };

  useEffect(() => {
    if (!coords) return;

    const fetchStops = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${coords.latitude}&originCoordLong=${coords.longitude}&format=json&accessId=a8af9c70-dca6-4354-b8b3-e70ad6bc2f4a`);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
        const data = await response.json();
        setStops(data.stopLocationOrCoordLocation);
      } catch (err) {
        setError('Failed to fetch stops');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStops();
  }, [coords]);

  if (!coords) return null;

  // OLD RENDER shows just nearby stops
  // return (
  //   <div>
  //     {loading && <p>Loading stops...</p>}
  //     {error && <p>{error}</p>}
  //     <ul>
  //       {stops.map((stop, index) => (
  //         <li key={index}>
  //           {stop.StopLocation ? `${stop.StopLocation.name} (${stop.StopLocation.id})` : 'Stop location data is not available.'}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  // new render
  return (
    <div>
      <ul>
        {stops.map((stop, index) => (
          <li key={index} onClick={() => handleStopSelect(stop.StopLocation.id)}>
            {stop.StopLocation.name}
          </li>
        ))}
      </ul>
      {selectedStopId && <DeparturesList stopId={selectedStopId} />}
    </div>
  );

}

export default StopsList;
