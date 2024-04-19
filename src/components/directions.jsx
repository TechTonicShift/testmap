// Example code to fetch route coordinates using Google Maps Directions API

// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'YOUR_API_KEY';

// Function to fetch route coordinates
async function fetchRouteCoordinates(origin, destination) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
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
// 
// source  25.492549, 81.863774
//Destination 25.459540, 81.837081
// Example usage
const origin = '25.492549,81.863774'; // Example origin coordinates (latitude, longitude)
const destination = '25.459540,81.837081'; // Example destination coordinates (latitude, longitude)

fetchRouteCoordinates(origin, destination)
  .then(coordinates => {
    console.log('Route coordinates:', coordinates);
  })
  .catch(error => {
    console.error('Error:', error);
  });
