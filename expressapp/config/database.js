const mongoose = require('mongoose')
require('dotenv').config()

exports.connect = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connection successfull')
    })
    .catch((error) => {
        console.log(`DB connection failed ${error}`)
    })
}