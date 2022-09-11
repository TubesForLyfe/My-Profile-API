const express = require('express');
const Cache = require('node-cache');
const WorkExperience = require('../models/work_experience');
require('dotenv').config();

const router = express.Router();
const cache = new Cache({stdTTL: 10});

// CREATE
router.post('/', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1] === process.env.AUTH_KEY) {
        const workExperiencePost = new WorkExperience({
            from: req.body.from,
            to: req.body.to,
            job_position: req.body.job_position,
            company: req.body.company,
            description: req.body.description
        });

        try {
            const workExperience = await workExperiencePost.save();
            res.json(workExperience);
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not Authorized"});
    }
});

// READ
router.get('/', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1] === process.env.AUTH_KEY) {
        try {
            if (cache.has("work_experiences")) {
                res.json(cache.get("work_experiences"));
            } else {
                const workExperience = await WorkExperience.find().sort({_id: -1});
                cache.set("work_experiences", workExperience);
                res.json(workExperience);
            }
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not Authorized"});
    }
});

// UPDATE
router.put('/:workExperienceId', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1] === process.env.AUTH_KEY) {
        try {
            const workExperienceUpdate = await WorkExperience.updateOne({_id: req.params.workExperienceId}, {
                from: req.body.from,
                to: req.body.to,
                job_position: req.body.job_position,
                company: req.body.company,
                description: req.body.description
            });
            res.json(workExperienceUpdate);
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not Authorized"});
    }
});

// DELETE
router.delete('/:workExperienceId', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1] === process.env.AUTH_KEY) {
        try {
            const workExperienceUpdate = await WorkExperience.deleteOne({_id: req.params.workExperienceId});
            res.json(workExperienceUpdate);
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not Authorized"});
    }
});

module.exports = router;