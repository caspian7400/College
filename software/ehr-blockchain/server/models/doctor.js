const mongoose = require("mongoose");

const patient = new mongoose.Schema({ eth_addr: { type: String } });

const DoctorSchema = new mongoose.Schema({
    eth_addr: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    specializations: {
        type: Array,
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
    licenseNumber: {
        type: String,
        required: true,
    },
    aadhaar: {
        type: String,
        required: true,
    },
    patients: [String],
});

module.exports = mongoose.model("Doctor", DoctorSchema);