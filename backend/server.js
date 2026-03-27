const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// SECURITY FIX: Helmet sets hardened HTTP response headers
// (X-Frame-Options, X-Content-Type-Options, HSTS, CSP, etc.)
app.use(helmet());

// SECURITY FIX: CORS origin is now read from FRONTEND_URL env variable
// instead of being hardcoded to localhost — safe to deploy to any host
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

// Global error handler — never forwards internal error details to the client
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
