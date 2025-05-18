let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeTaken= 0;
let timer2;
let timer;
let customizedTime;
let customizedTime2;
let timeLeft;
let timeLeft2;
let selectedQuestionCount = 10;
let userAnswers = [];
let selectedMode = "Timed";
let selectedCategory = "0";

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const questionCountSelect = document.getElementById("question-count");
const questionModeSelect = document.getElementById("question-mode");
const questionCategorySelect = document.getElementById("question-category");
const app = document.querySelector(".app");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");
const timerElement = document.getElementById("timer");
const modeDisplay= document.getElementById("mode-Display");
const timerOptions = document.getElementById('timer-options');
const timeValue = document.getElementById('time-limit');

const quizOptions = document.getElementById("quizOptions");
const dailyQuizStart = document.getElementById("dailyQuizStart");
const makeQuiz = document.getElementById("makeQuiz");
const makeQuizContainer = document.getElementById('quizContainer');

const reviewScreen = document.getElementById("review-screen");
const reviewContainer = document.getElementById("review-container");
const backButton = document.getElementById("back-btn");

const soundToggleBtn = document.getElementById("sound-toggle-btn");
let soundEnabled = true;

const correctSound = new Audio("./sound/happy.mp3");
const wrongSound = new Audio("./sound/ohno.mp3");
const timeoutSound = new Audio("./sound/timeout.mp3");

dailyQuizStart.addEventListener('click',()=>{
    quizOptions.classList.add("hiddenItem");
    selectedQuestionCount = 10;
    selectedMode = "daily";
    selectedCategory = "-1";
    customizedTime = 15;
    customizedTime2 = 15*1000;
    timeLeft = customizedTime;
    timeLeft2 = customizedTime2
    startScreen.style.display = "none";
    app.style.display = "block";
    modeDisplay.textContent = selectedMode + " Quiz";
    fetchQuestions();
});

makeQuiz.addEventListener('click',()=>{
    quizOptions.classList.add("hiddenItem");
    makeQuizContainer.classList.remove("hiddenItem");
    }
);

questionModeSelect.addEventListener('change', ()=>{
    if (questionModeSelect.value === 'Timed') {
      timerOptions.style.display = 'block';
    } else {
      timerOptions.style.display = 'none';
    }
});

soundToggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.textContent = soundEnabled ? "🔊 Sound: ON" : "🔇 Sound: OFF";
});

startButton.addEventListener("click", () => {
    selectedQuestionCount = parseInt(questionCountSelect.value);
    selectedMode = (questionModeSelect.value);
    selectedCategory = (questionCategorySelect.value);
    customizedTime = parseInt(timeValue.value);
    customizedTime2 = parseInt(timeValue.value)*1000;
    timeLeft = customizedTime;
    timeLeft2 = customizedTime2

    if(selectedMode === "Practice"){
        timerElement.style.display = "none";
    }
    startScreen.style.display = "none";
    app.style.display = "block";
    modeDisplay.textContent = selectedMode + " Quiz";
    fetchQuestions();
});

function fetchQuestions() {
    fetch(`/quiz/api/questions?count=${selectedQuestionCount}&category=${selectedCategory}`)
        .then(res => res.json())
        .then(data => {
            questions = data;
            startQuiz();
        });
}

function sendScore(gameScore, time, category) {
    fetch('/quiz/submitQuiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gameScore, time, category })
    })
        .then(res => res.json())
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(err => {
            console.error('Error sending score:', err);
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
    if(!(selectedMode === "Practice")){startTimer();}

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
    timeLeft = customizedTime;
    timeLeft2 = customizedTime2;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
    timeoutSound.pause();
    timeoutSound.currentTime = 0;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            userAnswers.push(null); // No answer
            triggerEmojiShower("sad");
            showCorrectAnswer();
            if (soundEnabled) {
                timeoutSound.currentTime = 0; // Rewind to start
                timeoutSound.play();
            }
            showTimeoutPopup()
            showCorrectAnswer();
        }
    }, 1000);
    timer2 = setInterval(() => {
        timeLeft2-=100;
        if (timeLeft2 <= 0) {
            clearInterval(timer2);
        }
    }, 100);
}

function selectAnswer(e) {
    if(!(selectedMode === "Practice")){
        clearInterval(timer);
        clearInterval(timer2);
    }
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        if(!(selectedMode === "Practice")){timeTaken += (customizedTime2 - timeLeft2)};
        triggerEmojiShower("happy");
        if (soundEnabled) {
            correctSound.play();
        }
    } else {
        selectedBtn.classList.add("incorrect");
        triggerEmojiShower("sad");
        if (soundEnabled) {
            wrongSound.play();
        }
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
    timerElement.style.display = "none";
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    progress.innerText = "";
    progressFill.style.width = "100%";
    nextButton.innerText = "Review Answers";
    nextButton.style.display = "block";
    if(!(selectedMode === "Practice")){sendScore(score, timeTaken, selectedCategory);}
    showFinalMessage(score, questions.length);

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
    quizOptions.classList.remove("hiddenItem");

});

function triggerEmojiShower(type) {
    const container = document.getElementById(type === "happy" ? "happy-emoji-shower" : "emoji-rain-container");

    const emojiList = type === "happy"
        ? ["🥳", "🎉", "✨", "😄", "🌟", "🎈", "😍"]
        : ["😢", "😭", "💔", "☹️", "😞", "😿", "😔"];

    const count = type === "happy" ? 30 : 25;

    for (let i = 0; i < count; i++) {
        const emoji = document.createElement("div");
        emoji.classList.add(type === "happy" ? "happy-emoji" : "emoji");
        emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.animationDelay = type === "happy" ? Math.random() * 0.3 + "s" : Math.random() * 0.5 + "s";
        emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + "rem";

        container.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, type === "happy" ? 3000 : 1800);
    }
}
//time outpop up messg 

function showTimeoutPopup() {
    const popup = document.getElementById("timeout-popup");
    popup.classList.remove("hidden");
}

function closeTimeoutPopup() {
    const popup = document.getElementById("timeout-popup");
    popup.classList.add("hidden");
}


//show popup message
function showFinalMessage(score, total) {
    const popup = document.getElementById("final-message-popup");
    const text = document.getElementById("popup-text");
    const emoji = document.getElementById("popup-emoji");

    if (score === total) {
        emoji.textContent = "🏆";
        text.textContent = "Perfect score! You're a quiz master!";
    } else if (score >= 8) {
        emoji.textContent = "👏";
        text.textContent = "Great job! Almost perfect!";
    } else if (score >= 5) {
        emoji.textContent = "😊";
        text.textContent = "Nice try! You did well!";
    } else {
        emoji.textContent = "😢";
        text.textContent = "Don't worry! Keep practicing and you'll get better!";


    }

    popup.classList.remove("hidden");
}

function closePopup() {
    document.getElementById("final-message-popup").classList.add("hidden");
}
