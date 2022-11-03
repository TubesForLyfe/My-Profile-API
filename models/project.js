const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    sequence: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Project', projectSchema);