const axios = require('axios');
require('dotenv').config();

const serviceId = process.env.serviceId;
const templateId = process.env.templateId;
const userId = process.env.userId;

class MailServices {
    static async sendEmail(coReadings, smokeReadings, time, date) {
        const url = 'https://api.emailjs.com/api/v1.0/email/send';
        const threshold = 400;
        const conversionRate = 0.5; // Conversion rate from percentage to cedis

        // Initialize charges with base calculation
        let charges = (Math.floor(coReadings / 100) * 10) + (Math.floor(smokeReadings / 100) * 10);

        // Calculate additional charges based on the percentage by which each value exceeds the threshold
        if (coReadings > threshold) {
            charges += Math.floor(((coReadings - threshold) / threshold) * 100) * conversionRate + 100;
        }
        if (smokeReadings > threshold) {
            charges += Math.floor(((smokeReadings - threshold) / threshold) * 100) * conversionRate + 100;
        }

        console.log(charges);

        const getIntensity = (reading) => {
            if (reading >= 0 && reading <= 150) return 'Low';
            if (reading >= 151 && reading <= 300) return 'Medium';
            if (reading >= 301 && reading <= 399) return 'High';
            if (reading >= 400) return 'Dangerous';
        };

        const coIntensity = getIntensity(coReadings);
        const smokeIntensity = getIntensity(smokeReadings);

        const myMessage = `Daily EcoWatch Reading (2 hours Interval)\n
            Carbon Dioxide: ${coReadings}\n
            Carbon Monoxide: ${smokeReadings}\n
            Intensity of emission (CO2): ${coIntensity}\n
            Intensity of emission (CO): ${smokeIntensity}\n
            Time: ${time}\n
            Date: ${date}\n
            Charges: ${charges} Cedis\n
            Location: University of Mines and Technology, Tarkwa
            \nThank You`;

        try {
            const response = await axios.post(url, {
                service_id: serviceId,
                template_id: templateId,
                user_id: userId,
                template_params: {
                    to_email: 'eratechnologiess@gmail.com',
                    from_name: "Ecowatch",
                    to_name: 'Ecowatch Admin',
                    reply_to: 'eratechnologiess@gmail.com',
                    subject: 'Ecowatch Daily Readings',
                    message: myMessage,
                },
            }, {
                headers: {
                    'origin': 'https://maifriend-server.onrender.com/',
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = MailServices;
