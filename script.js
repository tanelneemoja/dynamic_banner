const googleSheetsApiUrl = 'https://script.google.com/macros/s/AKfycbyqrC8P2Ml9DJZlatJWruqW15V0SUolUcQRDBRkqet6fNlMaga-JhKAAPokNv06x8Q/exec';

fetch(googleSheetsApiUrl)
  .then(response => response.json())
  .then(data => {
    // For each hotel, display the image using the CORS proxy
    data.forEach(hotel => {
      const imageUrl = hotel["image[0].url"]; // Get image URL from the data
      useCORSProxy(imageUrl); // Use the function to proxy the image
    });
  })
  .catch(error => console.error('Error fetching hotel data:', error));

// Function to proxy the image URL using CORS Anywhere
function useCORSProxy(imageUrl) {
  const corsProxy = 'https://thingproxy.freeboard.io/fetch/';
const imageUrl = 'https://s.tez-tour.com/hotel/19106/content_hotel_5cc845744eafe8_38414159_5416.jpg';
const proxiedUrl = corsProxy + encodeURIComponent(imageUrl);

const img = document.createElement('img');
img.src = proxiedUrl;
img.alt = 'Hotel Image';
img.style.width = '300px'; 
img.style.margin = '10px';  

document.body.appendChild(img);
