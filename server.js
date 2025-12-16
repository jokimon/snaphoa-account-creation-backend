// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// CORS options
const corsOptions = {
  origin: 'https://jokimon.github.io', // your frontend GH Pages URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json()); // parse JSON bodies

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Form submission endpoint
app.post('/api/submit', (req, res) => {
  const { firstName, lastName } = req.body;

  console.log('Received data:', firstName, lastName);

  // Respond with the submitted data
  res.json({
    status: 'success',
    firstName,
    lastName,
  });
});

// Handle preflight OPTIONS requests globally (optional, cors() already does this)
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
