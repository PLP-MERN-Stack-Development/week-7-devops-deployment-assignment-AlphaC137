const errorHandler = require('./src/middleware/errorHandler');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Sentry = require('@sentry/node');
const { morgan, logger } = require('./src/middleware/logger');
const security = require('./src/middleware/security');

const app = express();
const PORT = process.env.PORT || 5000;

// Sentry setup
Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  tracesSampleRate: 1.0,
});
app.use(express.json());
app.use(Sentry.Handlers.requestHandler());

// Middleware
app.use(express.json());
app.use(morgan);
app.use(security);

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/mernapp?authSource=admin';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./src/routes/auth'));
app.use('/api/tasks', require('./src/routes/tasks'));
app.use('/api', require('./src/routes/health'));

app.get('/', (req, res) => {
  res.send('Backend is running and connected to MongoDB!');
});

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());
// Custom error handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
