const googleSheetsApiUrl = 'https://script.google.com/macros/s/AKfycbyqrC8P2Ml9DJZlatJWruqW15V0SUolUcQRDBRkqet6fNlMaga-JhKAAPokNv06x8Q/exec';

fetch(googleSheetsApiUrl)
  .then(response => response.json())
  .then(data => {
    // Log the data to make sure it's being retrieved properly
    console.log(data); 

    // For each hotel, display the image using the CORS proxy
    data.forEach(hotel => {
      const imageUrl = hotel['image[0].url']; // Ensure the field name matches the column in Google Sheets
      if (imageUrl) {
        useCORSProxy(imageUrl);
      } else {
        console.log('No image URL for hotel:', hotel.name);
      }
    });
  })
  .catch(error => console.error('Error fetching hotel data:', error));

// Function to proxy the image URL using CORS Anywhere
function useCORSProxy(imageUrl) {
  const corsProxy = 'https://api.allorigins.win/get?url=';
  const proxiedUrl = corsProxy + encodeURIComponent(imageUrl); // URL encode the image URL

  // Dynamically create an image element and append it to the DOM
  const img = document.createElement('img');
  img.src = proxiedUrl;
  img.alt = 'Hotel Image';
  img.style.width = '300px';  // Adjust size as needed
  img.style.margin = '10px';  // Add some margin for spacing
  
  document.body.appendChild(img); // Append to the body or any container
}
