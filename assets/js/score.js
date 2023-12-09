const highScores = document.getElementById("highscores"); // gets HTML element by id and stores it in the variable highScores
const clear = document.getElementById("clear"); // gets clear button from HTML by id and stores is in the variable clear

window.onload = function () { // function is triggered when the window loads
  let scores = JSON.parse(localStorage.getItem("scores")); // parse the "scores" item from localStorage and stores it in the variable scores
  scores.forEach(function(score) {
      const li = document.createElement("li"); // creates a new list item for each score in the scores array
      li.textContent = score.initials.concat(": ", score.score); // set the text in the list item to the initials and score of the current score
      highScores.appendChild(li); // append list item to the highScores element 
  });
};

// Function to clear the scores
function clearScores(){
  localStorage.removeItem("scores"); // removes scores from the localStorage
  highScores.innerHTML = ""; // clears inner HTML of the highScores element
};

clear.addEventListener("click", clearScores); // if user clicks the clear highscores button the clear function is called