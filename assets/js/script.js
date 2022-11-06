// Query Selectors --------------------------------
var start = document.getElementById("welcome-screen");
var startBtn = document.getElementById("start-btn");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var timer = document.getElementById("");
var score = document.getElementById("");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var allDone = document.getElementById("allDone");


// Global Variables -------------------------------
// Array of Objects -------------------------------
// Create an array of objects to hold the question, user options, and answer

let quizArray = [
    {
        question: "Commonly used data types DO NOT include: ",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The conditional in an if/else statement is enclosed in: ",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in javascript can be used to store: ",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within _____________ when being assigned to a variable.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
];

var lastQuestionIndex = quizArray.length-1;
var currentQuestionIndex = 0;
var totalSeconds = 60;
var timeRemaining = 60;
var penaltySeconds = 15;
var numCorrect = 0;


console.log(quizArray[1].question);
console.log(quizArray[2].choices[2]);
console.log(quizArray[3].answer);




// FUNCTIONS ----------------------------

function init() {
    // time span = timeRemaining;
    quiz.style.display = "none";
    allDone.style.display = "none";
    question.style.display = "none";
}

function startQuiz(event) {
    event.preventDefault();
    start.style.display = "none";
    startBtn.style.display = "none";
    renderQuestion();

}

function renderQuestion() {
    var myQuestion = quizArray[currentQuestionIndex];
    quizArray.textContent = myQuestion.question;
    console.log(quizArray.innerHTML = "<h2>" + myQuestion.question + "</h2>");
    choiceA.innerHTML = myQuestion.choiceA;
    choiceB.innerHTML = myQuestion.choiceB;
    choiceC.innerHTML = myQuestion.choiceC;
    choiceD.innerHTML = myQuestion.choiceD;
}

// maybe just make conidtionals...
function answerIsCorrect() {
    // turn button green
}
function answerIsWrong() {
    // turn button red
}

// increment current question index by 1: 
// currentQuestionIndex++;

// start.style.display = "none";
// renderQuestion();
// quiz.style.display = "";


// EVENT HANDLERS -----------------------
// When user clicks "start" button, begin the startQuiz function
startBtn.addEventListener("click", startQuiz);
// init();