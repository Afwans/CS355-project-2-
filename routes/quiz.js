const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', (req, res) => {
    if (req.cookies.loggin !== "true") return res.redirect('/');
    console.log(req.cookies.userAvatar);
    res.render('./main/quiz', {
        extraCSS: '/Stylesheets/quiz.css', 
        extraScript: '/JavaScript/script.js',
        userName: req.cookies.userName,
        path: `/images/${req.cookies.userAvatar || "blankProfile.jpeg"}`
    });
});

router.get('/api/questions', quizController.getQuestions);
router.post('/submitQuiz', quizController.submitScore);

module.exports = router;
