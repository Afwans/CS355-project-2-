const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: String,
  correct: Boolean
});

const questionSchema = new mongoose.Schema({
  question: String,
  answers: [answerSchema]
});

const dailyQuizSchema = new mongoose.Schema({
  date: {
    type: String, 
    unique: true,
    required: true
  },
  questions: [questionSchema]
});

module.exports = mongoose.model('DailyQuiz', dailyQuizSchema);