const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    canvas: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Canvas'
    }
})

module.exports = mongoose.model('Item', Schema)