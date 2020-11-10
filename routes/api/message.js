const express = require("express");
const router = express.Router();
// const recaptcha = require("../../middleware/recaptcha");
const Message = require("../../models/Message");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * @route           GET api/auth
 * @description     Get API status
 */
router.get("/", async (req, res) => {
    res.status(200).send("POST Route up & running!!");
});

/**
 * @route           POST api/auth
 * @description     New Message POST route
 * @access          Public
 */
router.post("/", async (req, res) => {
    return res.send(req.body);
});

module.exports = router;
