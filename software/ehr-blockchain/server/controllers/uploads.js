const { Web3Storage } = require("web3.storage");
const multer = require("multer");
require("dotenv").config();

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

const uploadRecord = async (req, res) => {
    const medicalRecord = req.file;
    const recordData = medicalRecord.buffer;
    try {
        const cid = await client.put(recordData);
        console.log(cid);
    } catch (error) {
        console.log(error);
        res.status(500).send("errorhogaya");
    }
}

module.exports = {
    uploadRecord,
}