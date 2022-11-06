// Query Selectors --------------------------------


// Global Variables -------------------------------

// Array of Objects -------------------------------
// Create an array of objects to hold the question, user options, and answer

let quizArray = [
    {
        question: "Commonly used data types DO NOT include: ",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The conditional in an if/else statement is enclosed in: ",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in javascript can be used to store: ",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within _____________ when being assigned to a variable.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
];

console.log(quizArray[1].question);
console.log(quizArray[2].options[2]);
console.log(quizArray[3].answer);