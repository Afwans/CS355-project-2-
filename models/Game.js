const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true },
    TPQ: { type: Number, required: true }, // Time per question
    date: { type: Date, default: Date.now },
    category:{type:String, defualt:"0"}
});

module.exports = mongoose.model('Game', gameSchema);
