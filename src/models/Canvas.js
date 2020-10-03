const mongoose = require('mongoose')

const Schema = new mongoose.Schema({   
    email: {        
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: Number,
    description: String,
    exists: {
        type: Boolean,
        required: true
    }   
})

module.exports = mongoose.model('Canvas', Schema)
