const { Web3Storage, getFilesFromPath } = require("web3.storage");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const auth = require("../controllers/auth");
const files = require("../controllers/files");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/createPatient",auth.register)
app.post("/", files.getFiles);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
