const axios = require('axios');

// URL of the website you want to scrape
const url = 'https://www.essencemediacom.ee';

axios.get(url)
  .then(response => {
    // Print the HTML content to the logs
    console.log(response.data); 
  })
  .catch(error => {
    console.error('Error fetching website HTML:', error);
  });
