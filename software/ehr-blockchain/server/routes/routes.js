const auth = require("../controllers/auth");
const { Web3Storage } = require("web3.storage");
const uploads = require("../controllers/uploads")
require("dotenv").config();

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

const api = (app) => {
    app.post("/createPatient", auth.registerPatient);
    app.get("/getPatients", auth.getPatients);
    app.get("/getPatient/:eth_addr", auth.getPatients);
    app.delete("/deletePatient/eth_addr", auth.deletePatient);
    app.post("/createDoctor", auth.regsiterDoctor);
    app.get("/getDoctors", auth.getDoctors);
    app.get("/getDoctor/:eth_addr", auth.getDoctor);
    app.delete("/deleteDoctor/:eth_addr", auth.deleteDoctor);
    app.get("/getToken",uploads.getToken); 
    app.get("/getCount/:type", auth.getCount);
}

module.exports = api;
//TODO: add authorization tokens