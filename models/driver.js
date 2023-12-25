

const mongoose = require("mongoose");


const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    mobile: {
        type: Number
    },
    socketID: {
        type: String,
    },
    vehicle: {
        name:{
            type: String,
            trim: true,
        },
        id:{
            type: String,
            trim: true,
        },
        imgUrl:{
         type: String,  
        }
    }
});

module.exports = driverSchema;