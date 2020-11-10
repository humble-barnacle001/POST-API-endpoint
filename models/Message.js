const mongoose = require("mongoose");
const MsgSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String
    }
});

module.exports = Message = mongoose.model("post", MsgSchema);
