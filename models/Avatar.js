const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
    imgID: { type: String, required: true },
    path: { type: String, required: true }
});

module.exports = mongoose.model('Avatar', avatarSchema);
