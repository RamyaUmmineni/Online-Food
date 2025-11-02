// index.js (ESM)
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

// Allow your frontend origin (replace or use '*' for testing)
app.use(cors({
 origin: [allowedOrigin, 'http://localhost:5173'],
  credentials: true
}));

app.get('/', (req, res) => res.json({ ok: true }));
// <-- ADD this API health route -->
app.get('/api/health', (req, res) => {
  return res.json({ ok: true, service: 'backend', time: new Date().toISOString() });
});

// example auth route (if you need)
app.get('/api/auth', (req, res) => {
  res.json({ ok: true, auth: 'test' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('MONGO_URI not set — skipping DB connect for now.');
    } else {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('DB connected');
    }
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();

