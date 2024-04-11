// app.js
const express = require('express');
const serverRouter = require('./routes/server.route.js'); // Make sure this file exists and defines your routes

const app = express();

app.use(express.static('public')); // This serves static files from the 'public' directory
app.use(express.json()); // This middleware parses JSON bodies
app.use(express.urlencoded({ extended: true })); // This middleware parses URL-encoded bodies

// Use your serverRouter for routes
app.use('/', serverRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Export the app so it can be used in other files
module.exports = app;
