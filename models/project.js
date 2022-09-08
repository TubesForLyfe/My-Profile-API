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
        type: String,
        default: "#"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Project', projectSchema);