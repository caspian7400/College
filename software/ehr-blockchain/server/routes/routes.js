const express = require("express");
const cors = require("cors");
const auth = require("../controllers/auth");
const uploads = require("../controllers/uploads");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const api = (app) => {
    app.post("/createPatient", auth.registerPatient);
    app.get("/getPatients", auth.getPatients);
    app.get("/getPatient/:eth_addr", auth.getPatients);
    app.post("/deletePatient/eth_addr",auth.deletePatient);
    app.post("/createDoctor", auth.regsiterDoctor);
    app.get("/getDoctors", auth.getDoctors);
    app.get("/getDoctor/:eth_addr", auth.getDoctor);
    app.post("/deleteDoctor/:eth_addr",auth.deleteDoctor);
    app.post("/doctor/uploadRecord", uploads.uploadRecord)
}

module.exports = api;
