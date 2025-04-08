let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedQuestionCount = 10;
let userAnswers = [];

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const questionCountSelect = document.getElementById("question-count");
const app = document.querySelector(".app");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");

const reviewScreen = document.getElementById("review-screen");
const reviewContainer = document.getElementById("review-container");
const backButton = document.getElementById("back-btn");

const darkToggle = document.getElementById("dark-mode-toggle");

// 🌙 Load theme preference
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️ Light Mode";
}

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkToggle.textContent = "☀️ Light Mode";
        localStorage.setItem("mode", "dark");
    } else {
        darkToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("mode", "light");
    }
});

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
    userAnswers = [];
    nextButton.innerText = "Next";
    showQuestion();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
    resetState();
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    progress.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    shuffleArray(currentQuestion.answers).forEach(answer => {
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
    timeLeft = 10;
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
            userAnswers.push(null); // No answer
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

    userAnswers.push(selectedBtn.innerText);
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
    progressFill.style.width = "100%";
    nextButton.innerText = "Review Answers";
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
        app.style.display = "none";
        showReview();
    }
});

function showReview() {
    reviewScreen.style.display = "block";
    reviewContainer.innerHTML = "";

    questions.forEach((q, index) => {
        const reviewBlock = document.createElement("div");
        reviewBlock.classList.add("review-question");

        const userAnswer = userAnswers[index];
        const correctAnswer = q.answers.find(ans => ans.correct).text;

        reviewBlock.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      <div class="review-answer ${userAnswer === correctAnswer ? 'correct-answer' : 'incorrect-answer'}">
        Your Answer: <span class="user-answer">${userAnswer ?? 'No answer'}</span>
      </div>
      <div class="review-answer correct-answer">
        Correct Answer: ${correctAnswer}
      </div>
    `;

        reviewContainer.appendChild(reviewBlock);
    });
}

backButton.addEventListener("click", () => {
    reviewScreen.style.display = "none";
    startScreen.style.display = "block";
});
