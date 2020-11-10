const express = require("express");
const router = express.Router();
// const recaptcha = require("../../middleware/recaptcha");
const Message = require("../../models/Message");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * @route           GET api/message
 * @description     Get API status
 */
router.get("/", async (req, res) => {
    res.status(200).send("Message Route up & running!!");
});

/**
 * @route           POST api/message
 * @description     New Message POST route
 * @access          Public
 */
router.post("/", async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send("Empty message");
    }
    message = JSON.stringify(message);
    try {
        const payload = {
            message: message,
            date: new Date()
        };
        const token = jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: "999999999d"
        });
        const newPost = new Message({
            message: message,
            url: req.headers.origin || req.headers.host,
            token: token
        });
        const post = await newPost.save();
        return res.status(200).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
