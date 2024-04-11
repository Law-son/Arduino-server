const MailServices = require('../services/mail.services');
const DatabaseServices = require('../services/database.services');


exports.storeData = async (req, res, next) => {

    // Generate current time and date on the server
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    try {
        const {coReadings, smokeReadings} = req.body;

        let response = await DatabaseServices.storeData(coReadings, smokeReadings, time, date);

        res.json({status: true, success: response});
    }catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        next(error)
    }
}


exports.sendMail = async (req, res, next) => {

    // Generate current time and date on the server
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    try {
        const {coReadings, smokeReadings} = req.body;

        let response = await MailServices.sendEmail(coReadings, smokeReadings, time, date);

        res.json({status: true, success: response});
    }catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        next(error)
    }
}
