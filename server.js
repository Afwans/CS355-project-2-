const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const rawQuestions = JSON.parse(
    fs.readFileSync(path.join(__dirname, "questions.json"), "utf8")
);

const getRandomQuestions = (count = 10) => {
    const shuffled = rawQuestions.sort(() => 0.5 - Math.random()).slice(0, count);
    return shuffled.map(q => ({
        question: q.question,
        answers: [
            { text: q.A, correct: q.answer === "A" },
            { text: q.B, correct: q.answer === "B" },
            { text: q.C, correct: q.answer === "C" },
            { text: q.D, correct: q.answer === "D" }
        ]
    }));
};

app.get("/api/questions", (req, res) => {
    const questionCount = parseInt(req.query.count) || 10;
    const questions = getRandomQuestions(questionCount);
    res.json(questions);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
