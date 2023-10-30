const { Web3Storage, getFilesFromPath } = require("web3.storage");
require("dotenv").config();

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
const fs = require("fs");

const register = async (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body, null, 2);
        console.log(jsonData);
        fs.writeFileSync(process.env.FILE_PATH, jsonData, "utf-8");
        const file = await getFilesFromPath(process.env.FILE_PATH);
        const rootCid = await client.put(file, {
            name: "patient Data",
            maxRetries: 3,
        });
        console.log("Root CID:", rootCid);
        res.status(200).send({ status: "success", rootCid });
    } catch (error) {
        console.error("Error creating patient:", error);
        res.status(500).send({ error });
    }
    fs.writeFileSync(process.env.FILE_PATH, "");
    //empty the temporary buffer file
};

const update = async () => { }

module.exports = {
    register,
    update,
}