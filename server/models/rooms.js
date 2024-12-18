const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: String,
    users: [String],
    messages: [{
        username: String,
        message: String,
        timestamp: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);