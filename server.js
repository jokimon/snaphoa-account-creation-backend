// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
connectDB();

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
// app.post('/api/submit', (req, res) => {
//   const { firstName, lastName } = req.body;

//   console.log('Received data:', firstName, lastName);

//   // Respond with the submitted data
//   res.json({
//     status: 'success',
//     firstName,
//     lastName,
//   });
// });

// Submit form → SAVE to MongoDB
app.post('/api/submit', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    console.log("Received from frontend:", firstName, lastName);

    const newUser = new User({ firstName, lastName });
    const savedUser = await newUser.save();

    console.log("Saved to MongoDB:", savedUser);

    res.json({
      status: 'success',
      firstName,
      lastName,
    });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ status: 'error' });
  }
});


// Handle preflight OPTIONS requests globally (optional, cors() already does this)
// app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
