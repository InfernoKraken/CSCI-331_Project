const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes

app.get('/fetch-steam-sales', (req, res) => {
  // Run the Playwright script
  exec('npx playwright test steamsales.spec.js', (error) => {
    if (error) {
      return res.status(500).send('Error running Playwright script.');
    }

    // Read the resulting file
    fs.readFile('game_deals.txt', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file.');
      }
      res.send(data); // Send file content to client
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
