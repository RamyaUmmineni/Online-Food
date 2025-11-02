// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Root health-check
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Backend root OK' });
});

// API health-check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Example test auth route
app.get('/api/auth', (req, res) => {
  res.json({ ok: true, auth: 'test route' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

