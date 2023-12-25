const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
});

module.exports = userSchema;