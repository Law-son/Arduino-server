const MailServices = require('../services/mail.services');
const DatabaseServices = require('../services/database.services');

exports.storeData = async (req, res, next) => {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    try {
        const { coReadings, smokeReadings } = req.body;
        let response = await DatabaseServices.storeData(coReadings, smokeReadings, time, date);
        res.json({ status: true, success: response });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        next(error);
    }
};

exports.sendMail = async (req, res, next) => {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    try {
        const { coReadings, smokeReadings } = req.body;
        let response = await MailServices.sendEmail(coReadings, smokeReadings, time, date);

        if (res) {
            res.json({ status: true, success: response });
        } else {
            console.log('Scheduled email sent successfully');
        }
    } catch (error) {
        if (res) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            next(error);
        } else {
            console.error('Error sending scheduled email:', error);
        }
    }
};
