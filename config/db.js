const mongoose = require('mongoose');
const connection = mongoose.connect(process.env.URL).then(
    console.log("________ CONNECTED TO DB ________")
);
module.exports = connection;