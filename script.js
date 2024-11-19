const apiUrl = "https://script.google.com/macros/s/AKfycbyqrC8P2Ml9DJZlatJWruqW15V0SUolUcQRDBRkqet6fNlMaga-JhKAAPokNv06x8Q/exec";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Loop through the data and generate dynamic banners
    data.forEach(hotel => {
      const banner = document.createElement('div');
      banner.classList.add('banner');

      // Create the image element
      const img = document.createElement('img');
      img.src = hotel.image_url;  // Use the image URL from the data
      img.alt = hotel.name;

      // Add hotel information text
      const hotelInfo = document.createElement('div');
      hotelInfo.classList.add('hotel-info');
      hotelInfo.innerHTML = `
        <h2>${hotel.name}</h2>
        <p>Rating: ${hotel.star_rating} Stars</p>
        <p>Price: $${hotel.base_price}</p>
        <p>${hotel.address.city}, ${hotel.address.country}</p>
      `;

      // Append the image and hotel info to the banner
      banner.appendChild(img);
      banner.appendChild(hotelInfo);

      // Add the banner to the page (e.g., to a container with ID 'banners')
      document.getElementById('banners').appendChild(banner);
    });
  })
  .catch(error => console.error('Error fetching data:', error));