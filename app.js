const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const dataDirectory = path.join(__dirname, 'data');

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

// TODO sanitize!
app.post('/getData', (req, res) => {
    const major = req.body;
    if (!major.selectedMajor)
        return res.status(400).send('missing major');

    fs.readFile('data/'+major.selectedMajor+'.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const jsonData = JSON.parse(data);
            return res.json(jsonData);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    // res.json(major);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
