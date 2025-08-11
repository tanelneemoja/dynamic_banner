const puppeteer = require('puppeteer');

const url = 'https://www.essencemediacom.ee';

async function fetchHTML() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the page to load completely
  
  // Get the full HTML after rendering
  const html = await page.content();
  console.log(html); // Output the HTML to the logs
  
  await browser.close();
}

fetchHTML().catch(error => {
  console.error('Error fetching website HTML:', error);
});
