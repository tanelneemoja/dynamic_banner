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
  const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // CORS Anywhere proxy service
  const proxiedUrl = corsProxy + imageUrl; // Add the CORS proxy prefix

  console.log('Proxied Image URL:', proxiedUrl); // Log the proxied URL to check

  // Dynamically create an image element
  const img = document.createElement('img');
  img.src = proxiedUrl; // Use the proxied URL
  img.alt = 'Hotel Image';
  img.style.width = '300px';  // Adjust size as needed
  img.style.margin = '10px';  // Add some margin for spacing
  
  // Append the image to the body or any container in the page
  document.body.appendChild(img); // Or use a specific container, e.g., document.getElementById('image-container')
}
