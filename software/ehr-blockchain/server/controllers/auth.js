const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
require("dotenv").config();


const registerPatient = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phoneNumber, DOB, aadhaar, eth_addr } = req.body;
        const newPatient = new Patient({
            eth_addr: eth_addr,
            name: name,
            email: email,
            phone: phoneNumber,
            dob: DOB,
            aadhaar: aadhaar,
            doctors: [],
        });
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
}

const regsiterDoctor = async (req, res) => {
    try {
        console.log(req.body);
        const { name, specializations, email, phoneNumber, DOB, licenseNumber, aadhaar, eth_addr } = req.body;
        const newDoctor = new Doctor({
            eth_addr: eth_addr,
            name: name,
            specializations: specializations,
            email: email,
            phone: phoneNumber,
            dob: DOB,
            licenseNumber: licenseNumber,
            aadhaar: aadhaar,
            patients: [],
        });
        await newDoctor.save();
        res.status(201).json({ message: "Patient added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
}

const getPatients = async (req, res) => {
    try {
        const users = await Patient.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getDoctors = async (req, res) => {
    try {
        const users = await Doctor.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.eth_addr);
        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.eth_addr);
        res.status(200).json({ doctor });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updatePatient = async (req, res) => {
    try {
        const filter = { eth_addr: req.params.eth_addr };
        const update = req.body;
        const updatedPatient = await Patient.findOneAndUpdate(filter, update);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateDoctor = async (req, res) => {
    try {
        const filter = { eth_addr: req.params.eth_addr };
        const update = req.body;
        const updatedPatient = await Doctor.findOneAndUpdate(filter, update);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deletePatient = async (req, res) => {
    const eth_addr = req.params.eth_addr;
    await Patient.deleteOne({ eth_addr: eth_addr });
}

const deleteDoctor = async (req, res) => {
    const eth_addr = req.params.eth_addr;
    await Doctor.deleteOne({ eth_addr: eth_addr });
}

module.exports = {
    registerPatient,
    regsiterDoctor,
    getPatients,
    getPatient,
    getDoctors,
    getDoctor,
    updatePatient,
    updateDoctor,
    deletePatient,
    deleteDoctor,
}