const mongoose = require('mongoose');

// const profileSchema = new mongoose.Schema({
//     imgID: { type: String, default: "blankProfile" },
//     bio: { type: String, default: "My Bio" }
// });

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    imgID: { type: String, default: "0" },
    bio: { type: String, default: "My Bio" }
    // profile: profileSchema
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
