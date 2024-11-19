const googleSheetsApiUrl = 'https://script.google.com/macros/s/AKfycbyqrC8P2Ml9DJZlatJWruqW15V0SUolUcQRDBRkqet6fNlMaga-JhKAAPokNv06x8Q/exec';

fetch(googleSheetsApiUrl)
  .then(response => response.json())
  .then(data => {
    // Log the entire response for debugging
    console.log(data); // Check if image URL is correctly retrieved
    data.forEach(hotel => {
      // Access the image URL using bracket notation
      const imageUrl = hotel['image[0].url']; // Bracket notation to handle the key with square brackets
      console.log('Hotel Image URL:', imageUrl); // Log image URL to ensure correct value
      
      if (imageUrl) {
        useCORSProxy(imageUrl); // Call the CORS proxy function if the image URL is found
      } else {
        console.log('No image URL found for hotel:', hotel.name);
      }
    });
  })
  .catch(error => console.error('Error fetching hotel data:', error));

// Function to proxy the image URL using a CORS proxy service
function useCORSProxy(imageUrl) {
  const corsProxy = 'https://api.allorigins.win/get?url='; // Using allorigins as the CORS proxy
  const proxiedUrl = corsProxy + encodeURIComponent(imageUrl); // Add CORS proxy prefix

  // Dynamically create an image element
  const img = document.createElement('img');
  img.src = proxiedUrl; // Use the proxied URL for the image source
  img.alt = 'Hotel Image';
  img.style.width = '300px';  // Adjust image size
  img.style.margin = '10px';  // Add some margin for spacing

  document.body.appendChild(img); // Append image to the document body or any container
}
