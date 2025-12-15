const express = require('express');
const cors = require('cors');

const app = express();

// Allow only GH Pages frontend
app.use(cors({
  origin: 'https://jokimon.github.io'
}));

app.use(express.json());

// Health check
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

const PORT = process.env.PORT || 5020;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
