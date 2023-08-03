const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to read the JSON file and send it to the front-end
app.get('/data', (req, res) => {
  fs.readFile('CS_parsed.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
