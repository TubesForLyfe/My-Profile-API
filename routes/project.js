const express = require('express');
const Cache = require('node-cache');
const Project = require('../models/project');
require('dotenv').config();

const router = express.Router();
const cache = new Cache({stdTTL: 10});

// CREATE
router.post('/', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1] === process.env.AUTH_KEY) {
        const projectPost = new Project({
            title: req.body.title,
            description: req.body.description,
            image_path: "/projects/" + req.body.image_path,
            link: req.body.link,
            sequence: req.body.sequence
        });

        try {
            const project = await projectPost.save();
            res.json(project);
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
            if (cache.has("projects")) {
                res.json(cache.get("projects"));
            } else {
                const project = await Project.find().sort({sequence: -1});
                cache.set("projects", project);
                res.json(project);
            }
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not Authorized"});
    }
});

// UPDATE
router.put('/:projectId', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1] === process.env.AUTH_KEY) {
        try {
            const projectUpdate = await Project.updateOne({_id: req.params.projectId}, {
                title: req.body.title,
                description: req.body.description,
                image_path: "/projects/" + req.body.image_path,
                link: req.body.link,
                sequence: req.body.sequence
            });
            res.json(projectUpdate);
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not Authorized"});
    }
});

// DELETE
router.delete('/:projectId', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1] === process.env.AUTH_KEY) {
        try {
            const projectUpdate = await Project.deleteOne({_id: req.params.projectId});
            res.json(projectUpdate);
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not Authorized"});
    }
});

module.exports = router;