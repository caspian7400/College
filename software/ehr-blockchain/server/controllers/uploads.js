const { Web3Storage } = require("web3.storage");
require("dotenv").config();

const getToken = async (req, res) => {
    try {
        res.status(200).json({ token: process.env.WEB3_STORAGE_TOKEN });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getToken,
}