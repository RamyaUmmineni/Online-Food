// index.js (backend root)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// Allow your frontend on Render
app.use(cors({
  origin: 'https://online-food-frontend2.onrender.com',
  credentials: true
}));

app.get('/', (req, res) => {
  res.json({ message: 'Backend running successfully!' });
});

const PORT = process.env.PORT || 5000;

// Connect MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
}

startServer();
