import React, { useState, useEffect } from 'react';

function DeparturesList({ stopId }) {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stopId) return;

    const fetchDepartures = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.resrobot.se/v2.1/departureBoard?id=${stopId}&format=json&accessId=${import.meta.env.VITE_TRAFIKLAB_API_KEY}`);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
        const data = await response.json();
        setDepartures(data.Departure);
      } catch (err) {
        setError('Failed to fetch departures');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartures();
  }, [stopId]);

  if (!stopId) return null;

  return (
    <div>
      {loading && <p>Loading departures...</p>}
      {error && <p>{error}</p>}
      <ul>
        {departures.map((departure, index) => (
          <li key={index}>
            {departure.name} - {departure.direction} at {departure.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeparturesList;
