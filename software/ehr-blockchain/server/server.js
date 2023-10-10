const { Web3Storage, getFilesFromPath } = require("web3.storage");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const createPatient = async () => {
    const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
    try {
        const file = await getFilesFromPath(process.env.FILE_PATH);
        const rootCid = await client.put(file, {
            name: "patient Data",
            maxRetries: 3,
        });
        console.log("Root CID:", rootCid);
    } catch (error) {
        console.error("Error creating patient:", error);
        throw error; // Propagate the error up
    }
    fs.writeFileSync(process.env.FILE_PATH, "");
};

app.post("/createPatient", async (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body, null, 2);
        console.log(jsonData);
        fs.writeFileSync(process.env.FILE_PATH, jsonData, "utf-8");
        await createPatient();
        res.status(200).send("Patient created successfully");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error creating patient");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
