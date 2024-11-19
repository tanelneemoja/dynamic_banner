const googleSheetsApiUrl = 'https://script.google.com/macros/s/AKfycbyqrC8P2Ml9DJZlatJWruqW15V0SUolUcQRDBRkqet6fNlMaga-JhKAAPokNv06x8Q/exec';

fetch(googleSheetsApiUrl)
  .then(response => response.json())
  .then(data => {
    // Log the entire response to see what the data looks like
    console.log('Fetched data:', data); // Logs the full data response

    // Loop through each hotel data
    data.forEach(hotel => {
      // Log the hotel information
      console.log('Hotel Info:', hotel); // Logs the full hotel object

      // Access the image URL using bracket notation
      const imageUrl = hotel['image[0].url']; // Bracket notation to handle the key with square brackets

      // Log the image URL to check if it's correctly retrieved
      console.log('Hotel Image URL:', imageUrl); // Logs the image URL

      // Check if an image URL exists and then call the function
      if (imageUrl) {
        useCORSProxy(imageUrl); // Call the CORS proxy function if the image URL is found
      } else {
        console.log('No image URL found for hotel:', hotel.name);
      }
    });
  })
  .catch(error => {
    // Log any error that occurs during the fetch
    console.error('Error fetching hotel data:', error);
  });

// Function to proxy the image URL using a CORS proxy service
function useCORSProxy(imageUrl) {
  // Log the URL before passing it to the proxy
  console.log('Proxied Image URL:', imageUrl);

  const corsProxy = 'https://api.allorigins.win/get?url='; // Using allorigins as the CORS proxy
  const proxiedUrl = corsProxy + encodeURIComponent(imageUrl); // Add CORS proxy prefix

  // Log the proxied URL to make sure it's being constructed correctly
  console.log('Final Proxied URL:', proxiedUrl);

  // Dynamically create an image element
  const img = document.createElement('img');
  img.src = proxiedUrl; // Use the proxied URL for the image source
  img.alt = 'Hotel Image';
  img.style.width = '300px';  // Adjust image size
  img.style.margin = '10px';  // Add some margin for spacing

  // Log the image element being added
  console.log('Image element created:', img);

  document.body.appendChild(img); // Append image to the document body or any container
}
