// Variables 
let secondsleft = 76; // variable to set the seconds for the timer
let timeInterval; // variable for time interval
let questionNumber; // variable to keep track of the current question in the quiz
let score = 0; // variable to store the score

// Variables for DOM manipulation
const startButton = document.getElementById("start"); // start quiz button
const startScreen = document.getElementById("start-screen"); // includes the heading the paragraph and the start quiz button
const questions = document.getElementById("questions"); // questions div that contains the question title and answers buttons
const timer = document.getElementById("time"); // time span
const questionTitle = document.getElementById("question-title"); // question title includes the question 
const answerButtons = document.getElementById("choices"); // div to include the answers buttons
const feedback = document.getElementById("feedback"); // div to include feedback correct/wrong
const endScreen = document.getElementById("end-screen"); // end screen
const finalScore = document.getElementById("final-score"); // span to include final score
let initialsInput = document.getElementById("initials"); // input for initials
const submitButton = document.getElementById("submit"); // submit button
const highScores = document.getElementById("highscores"); // ol element from highscores html file

// Function to start quiz
function startQuiz() {
    startScreen.classList.add("hide"); // hides start screen
    questions.classList.remove("hide"); // shows questions screen
    questionNumber = 0; // is set to 0 so that the index 0 of the array is displayed first
    // calls the function to start the timer 
    setTime();
    // Calls function to display question 
    displayQuestion(quizQuestions[questionNumber]);
}
// Function to set the timer and countdown and display time
function setTime() {
    timeInterval = setInterval(function () {
        secondsleft--;
        timer.textContent = secondsleft;
    }, 1000);
}

startButton.addEventListener("click", startQuiz); // If user clicks the start button the startQuiz function is triggered

// Function to display questions
function displayQuestion() {
    const currentQuestion = quizQuestions[questionNumber]; // sets variable currentQuestion to be a q from array based on q number
    questionTitle.innerText = currentQuestion.question; // innerText returns the text content of question
    answerButtons.innerHTML = ""; // clears content of answerButtons element to remove previously displayed answer buttons before new ones are added
    currentQuestion.answers.forEach(function (answer, i) { // forEach iterates over the answers array. for each iteration it passes the current element to the callback function as the answer parameter
        const button = document.createElement("button"); // method to create a new button element
        button.innerText = answer.text; // innerText sets the text of the button as the answer 
        button.dataset.index = i; // sets the data attribute for button; the value of the attribute is set to i (i = index of the current answer in the answers array)
        button.addEventListener("click", checkAnswer); // every button has an event listener that triggers function checkAnswer 
        answerButtons.appendChild(button); // appendChild adds the button to the body of the document   
    });
}

// Function to check the answer 
function checkAnswer(event) {
    const currentQuestion = quizQuestions[questionNumber]; // // sets variable currentQuestion to be a q from array based on q number
    const answerIndex = event.target.dataset.index; // when button is clicked grab answer index from answers array in question object
    const answer = currentQuestion.answers[answerIndex]; // variable answer is the answers of the current question 
    if (answer.correct) { // if answer correct is true
        score += 5; // adds 5 point to score
        feedback.textContent = "Correct"; // displays Correct
        const audio = new Audio("./assets/sfx/correct.wav"); // stores audio for correct answer
        audio.play(); // play method to play sound
    } else { // if false
        secondsleft -= 10; // deducts 10seconds from timer
        feedback.textContent = "Wrong"; // displays Wrong
        const audio = new Audio("./assets/sfx/incorrect.wav"); // stores audio for incorrect answer
        audio.play(); // play method to play sound
    };
    questionNumber++; // go to next question
    if (questionNumber < quizQuestions.length) {  // if there is a question in the array
        displayQuestion(quizQuestions[questionNumber]); // display question
    }

    endQuiz(); // checks if the quiz should end
}

// Function to end quiz when time reached 0 or all questions are answered
function endQuiz() {
    if (secondsleft <= 0 || questionNumber >= quizQuestions.length) {
        clearInterval(timeInterval); // clears timer
        startScreen.classList.add("hide"); // hides start screen
        questions.classList.add("hide"); // hides question screen
        feedback.classList.add("hide"); // hides feedback
        endScreen.classList.remove("hide"); // shows end screen
        finalScore.textContent = score; // changes final score element to display score
    };
}

// Function to handle form submission
function submitInitials(event) { 
    event.preventDefault(); // prevent form from submitting and refreshing the page
    if (initialsInput.value) { // check if the intials input has a value
        let scores = JSON.parse(localStorage.getItem("scores")); // gets scores from local storage
        if(scores == null){ // if no score in local storage intialise an empty array
            scores = [];
        }
        scores.push({"initials": initialsInput.value, "score": score }); // push the score to the scores array
        localStorage.setItem("scores", JSON.stringify(scores));// saves the updated scores array to local storage
     
        window.location.href = "./highscores.html"; // redirect to high scores page
    };
   
}
// Adds event listener to the submit button to call submitInitials function when clicked
submitButton.addEventListener("click", submitInitials);


