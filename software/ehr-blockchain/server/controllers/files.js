const client = require("../middleware/client");

const getFiles = async (req, res) => {
    try{
        console.log(req);
        res.status(200).send("pog");
    } catch(error){
        console.log(error);
        res.status(500).send("errorhogaya");
    }
}

module.exports = {
    getFiles,
}