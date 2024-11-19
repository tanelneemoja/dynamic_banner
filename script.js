const googleSheetsApiUrl = 'https://script.google.com/macros/s/AKfycbyqrC8P2Ml9DJZlatJWruqW15V0SUolUcQRDBRkqet6fNlMaga-JhKAAPokNv06x8Q/exec';

fetch(googleSheetsApiUrl)
  .then(response => response.json())
  .then(data => {
    // For each hotel, display the image using Thingproxy
    data.forEach(hotel => {
      const imageUrl = hotel['image[0].url']; // Get image URL from the data
      console.log('Hotel Image URL:', imageUrl);
      useThingProxy(imageUrl); // Call function to use Thingproxy
    });
  })
  .catch(error => console.error('Error fetching hotel data:', error));

// Function to proxy the image URL using Thingproxy
function useThingProxy(imageUrl) {
  const corsProxy = 'https://thingproxy.freeboard.io/fetch/';
  const proxiedUrl = corsProxy + encodeURIComponent(imageUrl); // Add the Thingproxy URL prefix
  
  // Log the proxied URL to see what you're fetching
  console.log('Proxied Image URL:', proxiedUrl);
  
  // Dynamically create an image element and append it to the DOM
  const img = document.createElement('img');
  img.src = proxiedUrl;
  img.alt = 'Hotel Image';
  img.style.width = '300px';  // Adjust size as needed
  img.style.margin = '10px';  // Add some margin for spacing
  
  document.body.appendChild(img); // Append to the body or any container
}
