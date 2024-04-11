const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb+srv://lbekkeltd:lawson2023@cluster0.hbnhxze.mongodb.net/ecowatch').on('open', ()=>{
    console.log("Database connected successfully");
}).on('error', ()=>{
    console.log("Error connecting to database");
});

module.exports = connection;