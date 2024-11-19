const API_URL = 'https://script.google.com/macros/s/AKfycbyqrC8P2Ml9DJZlatJWruqW15V0SUolUcQRDBRkqet6fNlMaga-JhKAAPokNv06x8Q/exec';

// Fetch data from Google Apps Script API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Draw dynamic banner on canvas
function drawBanner(data) {
    const canvas = document.getElementById('bannerCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw hotel image
    const image = new Image();
    image.crossOrigin = 'anonymous'; // Avoid CORS issues
    image.onload = () => {
        ctx.drawImage(image, 0, 0, 400, 400); // Draw on the left side

        // Add text overlay
        ctx.fillStyle = '#333';
        ctx.font = '24px Arial';
        ctx.fillText(data.name, 420, 50); // Hotel name
        ctx.font = '18px Arial';
        ctx.fillText(`Price: $${data.base_price}`, 420, 100); // Price
        ctx.fillText(`Rating: ${data.star_rating} Stars`, 420, 150); // Star rating

        // Add address
        ctx.font = '16px Arial';
        ctx.fillText(`${data.address.city}, ${data.address.country}`, 420, 200);

        // Add download button functionality
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.onclick = () => {
            const link = document.createElement('a');
            link.download = `${data.name}_banner.png`;
            link.href = canvas.toDataURL();
            link.click();
        };
    };
    image.src = data['image[0].url'];
}

// Initialize and fetch data
(async function init() {
    const data = await fetchData();
    if (data && data.length > 0) {
        drawBanner(data[0]); // Render the first hotel banner
    } else {
        console.error('No data available or fetch failed.');
    }
})();