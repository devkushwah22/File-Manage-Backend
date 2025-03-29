const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB Connection Successful");
        })
        .catch((error) => {
            console.log("DB Connection Failed");
            console.error(error);
            process.exit(1);
        });
};
