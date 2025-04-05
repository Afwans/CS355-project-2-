let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let selectedQuestionCount = 10;

// DOM Elements
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const questionCountSelect = document.getElementById("question-count");
const app = document.querySelector(".app");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const progress = document.getElementById("progress");

startButton.addEventListener("click", () => {
    selectedQuestionCount = parseInt(questionCountSelect.value);
    startScreen.style.display = "none";
    app.style.display = "block";
    fetchQuestions();
});

function fetchQuestions() {
    fetch(`/api/questions?count=${selectedQuestionCount}`)
        .then(res => res.json())
        .then(data => {
            questions = data;
            startQuiz();
        });
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // Update progress
    progress.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer);
    timeLeft = 20;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    showCorrectAnswer();
}

function showCorrectAnswer() {
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    progress.innerText = "";
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        // Replay: Go back to start screen
        app.style.display = "none";
        startScreen.style.display = "block";
    }
});
