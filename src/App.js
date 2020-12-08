import { useEffect, useState } from 'react';
import { getDistance } from './utils/get-distance';
import './App.css';

function getPosition() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition((position) => {
      res(position)
    }, (error) => {
      alert('There was an error');
      rej(error);
    }, { enableHighAccuracy: true });
  })
}

function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [distance, setDistance] = useState(0)
  const [origin, setOrigin] = useState(null);
  const [isUpdatingOrigin, setIsUpdatingOrigin] = useState(false);

  // Request access to users location
  if ('geolocation' in navigator) {
    getPosition().then(() => {
      setHasAccess(true);
    })
  }

  const updateOrigin = () => {
    setIsUpdatingOrigin(true);
    getPosition().then((position) => {
      setOrigin(position.coords);
      setIsUpdatingOrigin(false);
      alert('Origin updated');
    })
  }

  useEffect(() => {
    // If there is no origin location, then there is nothing to measure against.. Yet
    if (!origin) {
      return;
    }

    const intervalId = setInterval(() => {
      getPosition().then((position) => {
        const distance = getDistance(origin, position.coords);
        setDistance(distance);
      });
    }, 100)

    return () => {
      clearInterval(intervalId);
    }
  }, [origin])

  return (
    <div className="App">
      {!hasAccess && (
        <div>
          Need to provide access to location for this application to work
        </div>
      )}

      {hasAccess && (
        <div>
          <div>
            <button disabled={isUpdatingOrigin} onClick={() => updateOrigin()}>Set Origin</button>
          </div>

          <div>
            Origin: {origin && <span>({origin.latitude}, {origin.longitude})</span>}
          </div>
          <div className="distance">
            Distance: {distance}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
