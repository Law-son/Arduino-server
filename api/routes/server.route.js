const router = require('express').Router();

const serverController = require('../controller/server.controller');

//server routes
router.post('/storeData', serverController.storeData);
router.post('/sendMail', serverController.sendMail);

module.exports = router;

