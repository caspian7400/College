const Web3Storage = require("web3.storage");
require("dotenv").config();

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

module.exports = {
    client
}