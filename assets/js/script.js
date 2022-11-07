// Query Selectors --------------------------------
var start = document.getElementById("welcome-screen");
var startBtn = document.getElementById("start-btn");

var quiz = document.querySelector(".quiz");
var pageQuestion = document.getElementById("question");

var timer = document.getElementById("");
var score = document.getElementById("");

var choiceBtn = document.querySelectorAll(".choice-btn");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var choiceArray = [choiceA, choiceB, choiceC, choiceD];

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
var userChoiceId;


console.log(quizArray[1].question);
console.log(quizArray[2].choices[2]);
console.log(quizArray[3].answer);




// FUNCTIONS ----------------------------

function init() {
    // time span = timeRemaining;
    start.style.display = "block";
    startBtn.style.display = "block";
    quiz.style.display = "none";
    allDone.style.display = "none";
    // pageQuestion.style.display = "none";
    quiz.style.display = "none";
}

function startQuiz(event) {
    event.preventDefault();
    start.style.display = "none";
    startBtn.style.display = "none";
    quiz.style.display = "block";
    // pageQuestion.style.display = "block";
    displayQuestion();

}

function displayQuestion() {
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
    console.log("user-choices: ", document.querySelector(".user-choices").id);
    // var userAns = answer.textContent;
    // console.log(userAns);
    // var correctAns = quizArray[currentQuestionIndex].answer;
    console.log("list of choice buttons: ", choiceBtn);
    // if (userAns === correctAns) {
    //     console.log("you got it, sister!");
    // } else {
    //     console.log("sowwy");
    // }
}

// maybe just make conidtionals...
function answerIsCorrect() {
    // if(quizArray[currentQuestionIndex].)
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
init();
// When user clicks "start" button, begin the startQuiz function
startBtn.addEventListener("click", startQuiz);
// choiceBtn.addEventListener("click", checkAnswer);
choiceBtn.forEach(userChoice => {
    userChoice.addEventListener('click', function handleClick(event) {
        // console.log('choice-btn clicked', event);
        // userChoice.setAttribute('style', 'background-color: red;');
        // console.log(userChoiceId);
        // console.log(typeof userChoiceId);
        userChoiceId = userChoice.id;
        checkAnswer();
    })
})