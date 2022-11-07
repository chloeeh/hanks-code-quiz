// Query Selectors --------------------------------
var start = document.getElementById("welcome-screen");
var startBtn = document.getElementById("start-btn");

var quiz = document.querySelector(".quiz");
var pageQuestion = document.getElementById("question");

var timerDisplay = document.getElementById("time-count");
var score = document.getElementById("final-score");
var viewScoreBtn = document.getElementById("view-highscore-btn");

var choiceBtn = document.querySelectorAll(".choice-btn");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var choiceArray = [choiceA, choiceB, choiceC, choiceD];
var feedbackMessage = document.getElementById("feedback-message");

var allDone = document.getElementById("allDone");
var submitBtn = document.getElementById("submit-btn");
var highScore = document.getElementById("high-score");
var scoreList = document.querySelector("#score-list");
var userInitials = document.querySelector("#initials");
var restartBtn = document.querySelector("#restart-btn");
var clearScoresBtn = document.querySelector("#clear-scores-btn");


// Global Variables -------------------------------

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

// GLOBALS ------------------------------
var lastQuestionIndex = quizArray.length-1;
var currentQuestionIndex = 0;
var points = 0;
var userChoiceId;
var arrayInitials = [];
var arrayScores = [];

var timeRemaining = 0;
var penaltySeconds = 0;
var timerInterval = setInterval(timer, 1000);


// FUNCTIONS ----------------------------

// Initialized variables, sets the game to the beginning
function init() {
    timeRemaining = 60;               // start time
    penaltySeconds = 15;              // if answer is wrong, decrease remaining time by the penalty
    clearInterval(timerInterval);    
    timerDisplay.textContent = timeRemaining;   // display the start time on the screen
    feedbackMessage.innerHTML = "";             // show an empty feedback message
    points = 0;                       // set points back to 0
    currentQuestionIndex = 0;         // set index back to 0 to start at first question
    score.textContent = points;
    var storedHighScores = JSON.parse(localStorage.getItem("arrayInitials"));   // manage local storage on init
    if (storedHighScores !== null) {
        arrayInitials = storedHighScores;
    }
    renderHighScores();
    // set blocks of HTML to show the start screen and button only on init
    start.style.display = "block";
    startBtn.style.display = "block";
    quiz.style.display = "none";
    allDone.style.display = "none";
    highScore.style.display = "none";
}

// Create the timer function
function timer() {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        // when timer runs out, clear the timer and go to the quizComplete function
        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            quizComplete();
        }
}

// When user clicks start button, go to quiz content
// start timer
// move to displayQuestion()
function startQuiz(event) {
    event.preventDefault();
    timerInterval = setInterval(timer, 1000);
    start.style.display = "none";
    startBtn.style.display = "none";
    quiz.style.display = "block";
    displayQuestion();

}

// Show the question stored at the currentQuestionIndex inside the quizArray
function displayQuestion() {
    var myQuestion = quizArray[currentQuestionIndex];

    // populate the question based on the object at the index
    pageQuestion.textContent = myQuestion.question;

    // Populate buttons with choices based on the object at the index
    for (var i = 0; i < choiceArray.length; i++) {
        choiceArray[i].textContent = myQuestion.choices[i];
    }
}

// Compare the button ID that the user selects to the answer in the quizArray
// display feedback message to user on their answer selection
// increment the currentQuestionIndex to go to the next question
// if the index is higher than the last question index in the quizArray, go to quizComplete
// else go to the next questions
function checkAnswer() {
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

// if the user selects correct answer, increment points
// display "CORRECT" to the user for 1 sec
function answerIsCorrect() {
    points++;

    feedbackMessage.innerHTML = "CORRECT!"
    setTimeout(function() {
        feedbackMessage.innerHTML = "";
    }, 1000)
}

// if the user selects wrong answer, take off time from the time remaining
// display "WRONG" to the user for 1 sec
function answerIsWrong() {
    timeRemaining -= penaltySeconds;
    
    feedbackMessage.innerHTML = "WRONG!"
    setTimeout(function() {
        feedbackMessage.innerHTML = "";
    }, 1000)
}

// Go to All Done! page to submit user initials
// clear the timer
function quizComplete() {
    quiz.style.display = "none";
    allDone.style.display = "block";
    score.textContent = points;

    clearInterval(timerInterval);
    timeRemaining = 0;
    timerDisplay.textContent = timeRemaining;
}

// Go to High Score page and show the scores of the user with their submitted initials
function renderHighScores() {
    allDone.style.display = "none";
    highScore.style.display = "block";
    scoreList.innerHTML = "";

     // Render a new li element for each user initials which includes their score
    for (var i = 0; i < arrayInitials.length; i++) {
        var updateInitials = arrayInitials[i];
        var updateScores = arrayScores[i];

        var li = document.createElement("li");
        li.textContent = updateInitials + " ---- " + updateScores;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
    }
}

// store the user text and score in locals storage
function storeHighScores() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("arrayInitials", JSON.stringify(arrayInitials));
    localStorage.setItem("arrayScores", JSON.stringify(arrayScores));
  }

// clear the high scores from local storage
  function clearHighScores() {
    arrayInitials.splice(0, arrayInitials.length);
    arrayScores.splice(0, arrayScores.length);
    storeHighScores();
    renderHighScores();
  }

// Call init
init();

// EVENT HANDLERS -----------------------
// When user clicks "start" button, begin the startQuiz function
startBtn.addEventListener("click", startQuiz);

// When user selects an answer grab the button's id and move to checkAnswer()
choiceBtn.forEach(userChoice => {
    userChoice.addEventListener('click', function handleEvent(event) {
        userChoiceId = userChoice.id;
        checkAnswer();
    })
})

// When user submits their initials, push their initials and their score to arrays,
// store the information
// render the information
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var initialsText = userInitials.value.trim();
    if (initialsText === "") {
        return;
    }

    arrayScores.push(points);
    arrayInitials.push(initialsText);
    userInitials.value = "";

    storeHighScores();
    renderHighScores();
});

// When user cliks Restart, go back to the initial page
restartBtn.addEventListener("click", init);
// When user cliks the Clear Scores button, go to clearHighScores function
clearScoresBtn.addEventListener("click", clearHighScores);
// at any time, when user wants to view the high scores, 
// render the scores
// show the high score page
// clear the timer
viewScoreBtn.addEventListener("click", function(event) {
    renderHighScores();

    start.style.display = "none";
    startBtn.style.display = "none";
    quiz.style.display = "none";
    allDone.style.display = "none";
    highScore.style.display = "block";

    clearInterval(timerInterval);
    timeRemaining = 0;
    timerDisplay.textContent = timeRemaining;
});