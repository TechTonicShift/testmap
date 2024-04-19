// Map.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    async function fetchRouteCoordinates(origin, destination) {
      try {
        const response = await fetch(`/directions?origin=${origin}&destination=${destination}`);
        const data = await response.json();
        
        if (data.status === 'OK') {
          const route = data.routes[0];
          const legs = route.legs;
          const coordinates = [];
          
          legs.forEach(leg => {
            leg.steps.forEach(step => {
              step.path.forEach(point => {
                coordinates.push({ lat: point.lat(), lng: point.lng() });
              });
            });
          });
          
          return coordinates;
        } else {
          console.error('Directions request failed:', data.status);
          return null;
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
        return null;
      }
    }

    // Example usage
    const origin = '25.492549,81.863774'; // Example origin coordinates (latitude, longitude)
    const destination = '25.459540,81.837081'; // Example destination coordinates (latitude, longitude)
    
    fetchRouteCoordinates(origin, destination)
      .then(coordinates => {
        console.log('Route coordinates:', coordinates);
        setRouteCoordinates(coordinates); // Set route coordinates in state
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={14}
        onLoad={(map) => setMap(map)}
      >
        {userLocation && <Marker position={userLocation} />}
        {routeCoordinates.map((coordinate, index) => (
          <Marker key={index} position={coordinate} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
