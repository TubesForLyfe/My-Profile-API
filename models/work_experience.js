const mongoose = require('mongoose');

const workExperienceSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    job_position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sequence: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('WorkExperience', workExperienceSchema);