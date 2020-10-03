const mongoose = require('mongoose')
require('dotenv').config()

module.exports = function connectToMongoDB() {
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
        () => {
            console.log('Connected to database')
        }
    )
}
