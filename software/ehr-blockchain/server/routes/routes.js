const auth = require("../controllers/auth");
const { Web3Storage } = require("web3.storage");
const uploads = require("../controllers/uploads")
require("dotenv").config();

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

const api = (app) => {
    app.post("/patient/create", auth.registerPatient);
    app.get("/patient/get", auth.getPatients);
    app.get("/patient/get/:eth_addr", auth.getPatient);
    app.patch("/patient/addFile/:eth_addr", auth.addFile);
    app.put("/patient/update")
    app.delete("/patient/delete/:eth_addr", auth.deletePatient);
    app.post("/doctor/create", auth.regsiterDoctor);
    app.patch("/doctor/addPatient/:eth_addr", auth.addNewPatient);
    app.get("/doctor/get", auth.getDoctors);
    app.get("/doctor/get/:eth_addr", auth.getDoctor);
    app.delete("/doctor/deletePatient/:eth_addr", auth.DeleteDocPatient);
    app.delete("/doctor/delete/:eth_addr", auth.deleteDoctor);
    app.get("/token/get",uploads.getToken); 
    app.get("/count/get/:type", auth.getCount);
}
module.exports = api;
//TODO: add authorization tokens