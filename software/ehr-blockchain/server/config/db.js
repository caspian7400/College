const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connection = () => {
    try {
        mongoose.connect(process.env.MONGODB_CONN_STRING, {
            useNewUrlParser: true,
        });
        console.log("Conntected to database");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;