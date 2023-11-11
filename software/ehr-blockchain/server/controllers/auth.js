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
        const patients = await Patient.find({}, {
            aadhaar: 0,
            doctors: 0,
            fileCount: 0,
        });
        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getPatient = async (req, res) => {
    try {
        const patient = await Patient.find({ eth_addr: req.params.eth_addr });
        res.status(200).json({ patient: patient[0] });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.find({ eth_addr: req.params.eth_addr });
        res.status(200).json({ doctor: doctor[0] });
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
        await Patient.findOneAndUpdate(filter, update);
        res.status(200).send( "successfully updated patient" );
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const addFile = async (req, res) => {
    try {
        await Patient.findOneAndUpdate({ eth_addr: req.params.eth_addr }, { $inc: { fileCount: 1 } });
        res.status(200).send("successfully added file");
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
        await Doctor.findOneAndUpdate(filter, update);
        res.status(200).send("successfully updated");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const addNewPatient = async (req, res) => {
    try {
        const patientAddr = req.body.eth_addr;
        await Doctor.updateOne({ eth_addr: req.params.eth_addr }, { $push: { patients: patientAddr } });
        res.status(200).send(`patient added to doctor: ${req.params.eth_addr}`);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const DeleteDocPatient = async (req, res) => {
    try {
        const patientAddr = req.body.eth_addr;
        await Doctor.update({ eth_addr: req.params.eth_addr }, { $pull: { patients: patientAddr } });
        res.status(200).send(`deleted patient from doctor: ${req.params.eth_addr}`);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deletePatient = async (req, res) => {
    try {
        const eth_addr = req.params.eth_addr;
        await Patient.deleteOne({ eth_addr });
        res.status(200).send("successfully deleted");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const eth_addr = req.params.eth_addr;
        await Doctor.deleteOne({ eth_addr });
        res.status(200).send("successfully deleted");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getCount = async (req, res) => {
    const type = req.params.type;
    if (type === "patient") {
        try {
            const count = await Patient.count({});
            res.status(200).json({ count })
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
    if (type === "doctor") {
        try {
            const count = await Doctor.count({});
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
    if (type === "file") {
        try {
            const count = await Patient.aggregate([
                {
                    $group: { _id: null, totalCount: { $sum: "$fileCount" } }
                }
            ]);
            res.status(200).json({ count: count[0].totalCount });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = {
    registerPatient,
    regsiterDoctor,
    getPatients,
    getPatient,
    getDoctors,
    getDoctor,
    updatePatient,
    addFile,
    updateDoctor,
    addNewPatient,
    DeleteDocPatient,
    deletePatient,
    deleteDoctor,
    getCount
}