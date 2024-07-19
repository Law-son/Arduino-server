// app.js
const express = require('express');
const cron = require('node-cron');
const serverRouter = require('./routes/server.route.js');
const serverController = require('./controller/server.controller');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your serverRouter for routes
app.use('/', serverRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Schedule the sendMail function to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
    try {
        const coReadings = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
        const smokeReadings = Math.floor(Math.random() * (300 - 150 + 1)) + 150;

        // Generate current time and date on the server
        const time = new Date().toLocaleTimeString();
        const date = new Date().toLocaleDateString();

        await serverController.sendMail({ body: { coReadings, smokeReadings } }, null, () => {});
        console.log('Scheduled email sent');
    } catch (error) {
        console.error('Error sending scheduled email:', error);
    }
});

// Export the app so it can be used in other files
module.exports = app;
