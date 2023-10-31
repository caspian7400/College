const mongoose = require("mongoose");

const doctor = new mongoose.Schema({ eth_addr: { type: String } });

const patientSchema = new mongoose.Schema({
    eth_addr: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    aadhaar: {
        type: String,
        required: true,
    },
    doctors: [doctor],
});

module.exports = mongoose.model("Patient", patientSchema);