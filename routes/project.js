const express = require('express');
const Cache = require('node-cache');
const Project = require('../models/project');

const router = express.Router();
const cache = new Cache({stdTTL: 10});

// CREATE
router.post('/', async (req, res) => {
    const image_path = "/projects/" + req.body.image_path
    const projectPost = new Project({
        title: req.body.title,
        description: req.body.description,
        image_path: image_path,
        link: req.body.link
    });

    try {
        const project = await projectPost.save();
        res.json(project);
    } catch (err) {
        res.json({message: err});
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        if (cache.has("projects")) {
            res.json(cache.get("projects"));
        } else {
            const project = await Project.find().sort({_id: -1});
            cache.set("projects", project);
            res.json(project);
        }
    } catch (err) {
        res.json({message: err});
    }
});

// UPDATE
router.put('/:projectId', async (req, res) => {
    try {
        const projectUpdate = await Project.updateOne({_id: req.params.projectId}, {
            title: req.body.title,
            description: req.body.description,
            image_path: req.body.image_path,
            link: req.body.link
        });
        res.json(projectUpdate);
    } catch (err) {
        res.json({message: err});
    }
});

// DELETE
router.delete('/:projectId', async (req, res) => {
    try {
        const projectUpdate = await Project.deleteOne({_id: req.params.projectId});
        res.json(projectUpdate);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;