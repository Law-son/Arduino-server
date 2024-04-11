const mongoose = require('mongoose');

const db = require('../config/db');

const { Schema } = mongoose;
    const dataSchema = new Schema({
        CO_Readings: {
            type: String
        },
        Smoke_Readings: {
            type: String,
        },
        Time: {
            type: String,      
        },
        Date: {
            type: String,      
        },
    });
    
    const dataModel = db.model('Data', dataSchema);

    module.exports = dataModel; 