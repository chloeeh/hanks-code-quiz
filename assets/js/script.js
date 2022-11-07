// Query Selectors --------------------------------
var start = document.getElementById("welcome-screen");
var startBtn = document.getElementById("start-btn");

var quiz = document.querySelector(".quiz");
var pageQuestion = document.getElementById("question");

var timerDisplay = document.getElementById("time-count");
var score = document.getElementById("final-score");

var choiceBtn = document.querySelectorAll(".choice-btn");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var choiceArray = [choiceA, choiceB, choiceC, choiceD];

var allDone = document.getElementById("allDone");
var submitBtn = document.getElementById("submit-btn");
var highScore = document.getElementById("high-score");
var scoreList = document.querySelector("#score-list");
var userInitials = document.querySelector("#initials");
var restartBtn = document.querySelector("#restart-btn");
var clearScoresBtn = document.querySelector("#clear-scores-btn");


// Global Variables -------------------------------
// Array of Objects -------------------------------
// Create an array of objects to hold the question, user options, and answer

let quizArray = [
    {
        question: "Commonly used data types DO NOT include: ",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "C"
    },
    {
        question: "The conditional in an if/else statement is enclosed in: ",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "C"
    },
    {
        question: "Arrays in javascript can be used to store: ",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "D"
    },
    {
        question: "String values must be enclosed within _____________ when being assigned to a variable.",
        choices: ["quotes", "curly brackets", "commas", "parentheses"],
        answer: "A"
    },
];

var lastQuestionIndex = quizArray.length-1;
var currentQuestionIndex = 0;
var points = 0;
var userChoiceId;
var arrayScores = [];

var timeRemaining = 0;
var penaltySeconds = 0;
var timerInterval = setInterval(timer, 1000);


console.log(quizArray[1].question);
console.log(quizArray[2].choices[2]);
console.log(quizArray[3].answer);


// FUNCTIONS ----------------------------

function init() {
    // time span = timeRemaining;
    // time = 0;
    timeRemaining = 60;
    penaltySeconds = 15;
    clearInterval(timerInterval);
    timerDisplay.textContent = timeRemaining;
    points = 0;
    currentQuestionIndex = 0;
    score.textContent = points;
    var storedHighScores = JSON.parse(localStorage.getItem("arrayScores"));
    if (storedHighScores !== null) {
        arrayScores = storedHighScores;
    }
    renderHighScores();
    start.style.display = "block";
    startBtn.style.display = "block";
    quiz.style.display = "none";
    allDone.style.display = "none";
    highScore.style.display = "none";
}

function timer() {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            quizComplete();
        }
}

function startQuiz(event) {
    event.preventDefault();
    timerInterval = setInterval(timer, 1000);
    start.style.display = "none";
    startBtn.style.display = "none";
    quiz.style.display = "block";
    displayQuestion();

}

function displayQuestion() {

    if (currentQuestionIndex > 0) {
        document.getElementById(userChoiceId).style.backgroundColor = "#6c757d";
    }
    var myQuestion = quizArray[currentQuestionIndex];

    // populate the question based on the object at the index
    pageQuestion.textContent = myQuestion.question;

    // Populate buttons with choices based on the object at the index
    for (var i = 0; i < choiceArray.length; i++) {
        choiceArray[i].textContent = myQuestion.choices[i];
    }
    // currentQuestionIndex++;
}

function checkAnswer() {
    console.log(userChoiceId);
    // var userAns = answer.textContent;
    // console.log(userAns);
    var correctAns = quizArray[currentQuestionIndex].answer;
    if (userChoiceId === correctAns) {
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    if (timeRemaining <= 0) {
        quizComplete();
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === quizArray.length) {
        quizComplete();
    } else {
        displayQuestion();
    }
}

// maybe just make conditionals...
function answerIsCorrect() {
    document.getElementById(userChoiceId).style.backgroundColor = "green";
    console.log("you got it, sister!");
    points++;
}
function answerIsWrong() {
    document.getElementById(userChoiceId).style.backgroundColor = "red";
    console.log("sowwy");
    timeRemaining -= penaltySeconds;
}

function quizComplete() {
    quiz.style.display = "none";
    allDone.style.display = "block";
    score.textContent = points;

    clearInterval(timerInterval);
    timeRemaining = 0;
    timerDisplay.textContent = timeRemaining;
}

function renderHighScores() {
    // event.preventDefault();
    allDone.style.display = "none";
    highScore.style.display = "block";
    scoreList.innerHTML = "";

     // Render a new li for each todo
    for (var i = 0; i < arrayScores.length; i++) {
        var updateScore = arrayScores[i];

        var li = document.createElement("li");
        li.textContent = updateScore;
        li.setAttribute("data-index", i);

        // var button = document.createElement("button");
        // button.textContent = "Complete ✔️";

        // li.appendChild(button);
        scoreList.appendChild(li);
    }
}

function storeHighScores() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("arrayScores", JSON.stringify(arrayScores));
  }

  function clearHighScores() {
    arrayScores.splice(0, arrayScores.length);
    storeHighScores();
    renderHighScores();
  }


// EVENT HANDLERS -----------------------
init();
// When user clicks "start" button, begin the startQuiz function
startBtn.addEventListener("click", startQuiz);
// choiceBtn.addEventListener("click", checkAnswer);
choiceBtn.forEach(userChoice => {
    userChoice.addEventListener('click', function handleEvent(event) {
        console.log(userChoice);
        userChoiceId = userChoice.id;
        checkAnswer();
    })
})
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var initialsText = userInitials.value.trim();

    if (initialsText === "") {
        return;
    }

    arrayScores.push(initialsText);
    userInitials.value = "";

    storeHighScores();
    renderHighScores();

});

restartBtn.addEventListener("click", init);
clearScoresBtn.addEventListener("click", clearHighScores);