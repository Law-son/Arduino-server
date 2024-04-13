const axios = require('axios');
require('dotenv').config();

const serviceId = process.env.serviceId;
const templateId = process.env.templateId;
const userId = process.env.userId;

class MailServices {
    static async sendEmail(coReadings, smokeReadings, time, date) {
        const url = 'https://api.emailjs.com/api/v1.0/email/send';
        const threshold = 400;
        let charges = 0;

        // Calculate charges based on the percentage by which each value exceeds the threshold
        if (coReadings > threshold) {
            charges += Math.floor(((coReadings - threshold) / threshold) * 100);
        }
        if (smokeReadings > threshold) {
            charges += Math.floor(((smokeReadings - threshold) / threshold) * 100);
        }

        const myMessage = `Good day Ecowatch user,\nYour Ecowatch reading for the day\n
            Carbon Monoxide Reading: ${coReadings}\n
            Smoke Reading: ${smokeReadings}\n
            Time: ${time}\n
            Date: ${date}\n
            Charges: ${charges}%\n
            Charges: University of Mines and Technology, SRID%\n
            \nThank You`;

        try {
            const response = await axios.post(url, {
                service_id: serviceId,
                template_id: templateId,
                user_id: userId,
                template_params: {
                    to_email: 'buabassahlawson@gmail.com',
                    from_name: "Ecowatch",
                    to_name: 'Ecowatch Admin',
                    reply_to: 'buabassah@gmail.com',
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