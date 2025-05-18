const axios = require('axios');
const Game = require('../models/Game');
const DailyQuiz = require('../models/DailyQuiz');
const { decode } = require('html-entities');

// Fetch quiz questions from Trivia API
exports.getQuestions = async (req, res) => {
    const category = req.query.category;
    const count = parseInt(req.query.count) || 10;
    if(!(category==="-1")){
        let url;
        try {
            if(category=="0"){
                url = `https://opentdb.com/api.php?amount=${count}&type=multiple`;
            }else{
                url = `https://opentdb.com/api.php?amount=${count}&category=${category}&type=multiple`;
            }
            const response = await axios.get(url);
            const results = response.data.results;

            const formattedQuestions = results.map((q, index) => {
                const correct = decode(q.correct_answer);
                const allAnswers = [
                    ...q.incorrect_answers.map(ans => decode(ans)),
                    correct
                ].sort(() => 0.5 - Math.random());
                // const correct = q.correct_answer;
                // const allAnswers = [...q.incorrect_answers, correct].sort(() => 0.5 - Math.random());

                return {
                    question: decode(q.question),
                    answers: allAnswers.map(text => ({
                        text,
                        correct: text === correct
                    // question: q.question,
                    // answers: allAnswers.map(text => ({
                    //     text,
                    //     correct: text === correct
                    }))
                };
            });

            res.json(formattedQuestions);
        } catch (err) {
            console.error(err);
            res.status(500).send("Failed to fetch questions.");
        }
    }else{
        const date = new Date().toISOString().split('T')[0];
        const dailyQuiz = await DailyQuiz.findOne({ date: date}).exec();
        if(!dailyQuiz){
            try{
                const response = await axios.get(`https://opentdb.com/api.php?amount=${count}&type=multiple`);
                const results = response.data.results;

                const formattedQuestions = results.map((q, index) => {
                    const correct = decode(q.correct_answer);
                    const allAnswers = [
                        ...q.incorrect_answers.map(ans => decode(ans)),
                        correct
                    ].sort(() => 0.5 - Math.random());
                    return {
                        question: decode(q.question),
                        answers: allAnswers.map(text => ({
                        text,
                        correct: text === correct
                        }))
                    };
                });
                const newdailyQuiz= await DailyQuiz.create({
                    "date":date,
                    "questions": formattedQuestions
                });
                // dailyQuiz = new DailyQuiz({
                // date,
                // questions: formattedQuestions
                // });

                res.json(formattedQuestions);
                } catch (err) {
                console.error(err);
                    res.status(500).send("Failed to fetch questions.");
                }
            } else {
                res.json(dailyQuiz.questions);
            }
    }};

// Save quiz result
exports.submitScore = async (req, res) => {
    const { gameScore, time, category } = req.body;
    const questionCount = parseInt(req.query.count) || 10;
    const TPQ = parseFloat((time / (questionCount * 1000)).toFixed(2));
    const score = Math.round((gameScore / questionCount) * 100);

    try {
        const game = new Game({
            userId: req.cookies.userID,
            score: isNaN(score) ? 0 : score,
            TPQ: isNaN(TPQ) ? 0.01 : TPQ,
            category: category
        });

        await game.save();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save score" });
    }
};
