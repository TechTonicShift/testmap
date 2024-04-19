// ParentComponent.js
import React from 'react';
import Map from './Map';

const ParentComponent = () => {
  // Assuming latitude and longitude are obtained from the console object
  const consoleObject = {
    latitude: 40.7128, // Example latitude
    longitude: -74.0060 // Example longitude
  };

  return (
    <div>
      <h1>Map with Marker at Provided Position</h1>
      <Map  />
    </div>
  );
};

export default ParentComponent;
