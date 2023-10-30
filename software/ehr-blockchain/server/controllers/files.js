const { Web3Storage } = require("web3.storage");
require("dotenv").config();

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
const getFiles = (req, res) => {
    try {
        const cids = req.body.cidArray;
        console.log(req.body);
        const fileArray = [];
        console.log(fileArray);
        cids.forEach(async (cid) => {
            const info = await client.status(cids);
            console.log(info);
            const response = await client.get(cid);
            console.log(response);
            const file = await response.files();
            console.log(file);
            fileArray.push(file);
        })
        // console.log(fileArray);
        res.status(200).send(fileArray);
    } catch (error) {
        console.log(error);
        res.status(500).send("errorhogaya");
    }
}

module.exports = {
    getFiles,
}