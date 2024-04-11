const DataModel = require('../model/data.model'); // Import your Mongoose data model

class DatabaseServices {
  static async storeData(coReadings, smokeReadings, time, date) {
    try {
      // Create a new instance of your Mongoose data model
      const newData = new DataModel({
        CO_Readings: coReadings,
        Smoke_Readings: smokeReadings,
        Time: time,
        Date: date
      });

      // Save the data to the database
      await newData.save();
      
      console.log("Data stored successfully.");

      // Return the newly created data
      return newData;
    } catch (error) {
      // Handle any errors
      console.error("Error storing data:", error);
      throw error;
    }
  }
}

module.exports = DatabaseServices;
