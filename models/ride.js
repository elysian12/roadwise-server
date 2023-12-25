const mongoose = require("mongoose");
const user = require("./user");
const driver = require("./driver");


const rideSchema = new mongoose.Schema({
    user: user,
    driver:driver,
    destination: {
        lat : {
            required: true,
            type: String,
        },
        lng : {
            required: true,
            type: String,
        }
    },
    source:{
        lat : {
            required: true,
            type: String,
        },
        lng : {
            required: true,
            type: String,
        }
    },
    driverCurrentLocation:{
        lat : {
            required: true,
            type: String,
        },
        lng : {
            required: true,
            type: String,
        }
    }
    
});

const rideModel = mongoose.model("Rides", rideSchema);

module.exports = rideModel;