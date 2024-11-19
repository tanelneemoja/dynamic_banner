fetch(googleSheetsApiUrl)
  .then(response => response.json())
  .then(data => {
    // For each hotel, display the image using the CORS proxy
    data.forEach(hotel => {
      const imageUrl = hotel.imageUrl; // Get image URL from the data
      useCORSProxy(imageUrl);
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