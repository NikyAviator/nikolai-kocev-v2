// Makes use of .env file for configuration
require('dotenv').config();
// Starts the basic express server
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Init of CORS and the use of the cors middleware
const cors = require('cors');
app.use(cors());

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running, amazing!');
});

// Server listening on the port defined in the .env file or defaulting to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
