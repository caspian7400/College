const { Web3Storage, getFilesFromPath } = require('web3.storage')
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new Web3Storage({ token: process.env.WEB_STORAGE_TOKEN });
const createPatient = async (jsonData) => {
    const file = await getFilesFromPath(process.env.FILE_PATH);
    const rootCid = await client.put(file, {
        name: 'patient Data',
        maxRetries: 3,
    });
    console.log(rootCid);
    // fs.readFile("./dataBuffer.json", async (err, file) => {
    //     if (err) throw new Error("Error while reading file ", err);
    //     const rootCid = await client.put(file, {
    //         name: 'patient Data',
    //         maxRetries: 3,
    //     });
    //     console.log(rootCid);
    // });
    return;
}


app.post("/createPatient", async (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body, null, 2);
        // fs.writeFileSync("./datBuffer.json",jsonData, "utf-8");
        await createPatient(jsonData);
        console.log(req.body, typeof (req.body));
        res.send("patient created successfully");
    }
    catch (err) {
        res.send("error creating patient");
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})