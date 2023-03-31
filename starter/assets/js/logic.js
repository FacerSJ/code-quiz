// 1. When the 'start' botton is clicked, the timer starts.
// 2. When the timer starts, I am presented with a question.
// 3. When I answer a question I am presented with another question.
// 4. When I asnwer the question incorrectly, it substracts time from the clock.
// 5. When all question are answred OR timer reaches 0, the game is over.
// 6. When the game is over, then I can save my initials and score.



// Elements

var timerEl = document.querySelector("#time");

var startBtn = document.querySelector("#start");

var questionsEl = document.querySelector("#questions");

var choicesEl = document.querySelector("#choices");

var initialsEl = document.querySelector("#initials");

var submitBtn = document.querySelector("#submit");

var feedbackEl = document.querySelector("#feedback");

// sound

// var soundCorrect;
// var soundIncorrect;

// var soundCorrect = new Audio();
// soundCorrect.src = "./sfx/correct.wav"
// var soundIncorrect = new Audio();
// soundIncorrect.src = "./sfx/incorrect.wav"

// import soundCorrect from '../sfx/correct.wav';
// import soundIncorrect from '../sfx/incorrect.wav';







// quiz state variables

var currentQuestionIndex = 0;


//  Set the time to indicate how many seconds the quiz should start with. * 15 will give 15 seconds for each question. As there are 5 questions (5*15), the starting time will be 75 seconds.
var time = questions.length * 15;

var timerId;




function startQuiz() {

  

  // hide start screen

  var startScreenEl = document.getElementById("start-screen");

  startScreenEl.setAttribute("class", "hide");




  // un-hide questions section

  questionsEl.removeAttribute("class");




  // start timer

  timerId = setInterval(clockTick, 1000);




  // show starting time

  timerEl.textContent = time;




  getQuestion();

  // add sound effect

  soundCorrect = new sound ('sfx/correct.wav')
  soundIncorrect = new sound ('sfx/incorrect.wav')

}




function getQuestion() {

  // get current question object from array

  var currentQuestion = questions[currentQuestionIndex];




  // Title will now equal current question

  var titleEl = document.getElementById("question-title");

// get question title from questions.js

  titleEl.textContent = currentQuestion.questionTitle;




  // clear out any old question choices

  choicesEl.innerHTML = "";









  // loop over choices

  currentQuestion.choices.forEach(function(choice, i) {

    // create new button for each choice

    var choiceNode = document.createElement("button");

    choiceNode.setAttribute("class", "choice");

    choiceNode.setAttribute("value", choice);



    // Add numbers and a "." in front of the question
    choiceNode.textContent = i + 1 + ". " + choice;




    // attach click event listener to each choice

    choiceNode.onclick = answerClick;




    // display on the page

    choicesEl.appendChild(choiceNode);

  });

}











function answerClick() {

  // check if user guessed wrong

  if (this.value !== questions[currentQuestionIndex].answer) {

    // soundIncorrect.play();

    

    // If user guessed wrong, penalize time: - 10 seconds
    time -= 10;




    // display new time on page

    timerEl.textContent = time;

    

    feedbackEl.textContent = "Wrong! :(";
    

  } else {


    feedbackEl.textContent = "Correct! :)";
    // soundCorrect.play();

    


  }




  // flash right/wrong feedback

  feedbackEl.setAttribute("class", "feedback");

  setTimeout(function() {

    feedbackEl.setAttribute("class", "feedback hide");

  }, 1000);



  // if (isCorrect) {
  //   ("#feedback").html(`Way to go!`).show();
  //   soundCorrect.play();
  // }
  // else {
  //   ("#feedback").html(`Better luck next time.`).show();
  //   soundIncorrect.play();
  // }




  // next question

  currentQuestionIndex++;




  // time checker

  if (currentQuestionIndex === questions.length) {

    quizEnd();

  } else {

    getQuestion();

  }

}




function quizEnd() {

  // stop timer

  clearInterval(timerId);




  // show end screen

  var endScreenEl = document.getElementById("end-screen");

  endScreenEl.removeAttribute("class");




  // show final score

  var finalScoreEl = document.getElementById("final-score");

  finalScoreEl.textContent = time;




  // hide questions section

  questionsEl.setAttribute("class", "hide");

}




function clockTick() {

  // update time

  time--;

  timerEl.textContent = time;




  // check if user ran out of time

  if (time <= 0) {

    quizEnd();

  }

}




function saveHighscore() {

  // get value of input box

  var initials = initialsEl.value.trim();




  if (initials !== "") {

    // get saved scores from localstorage, or if not any, set to empty array

    var highscores =

      JSON.parse(window.localStorage.getItem("highscores")) || [];




    // format new score object for current user

    var newScore = {

      score: time,

      initials: initials

    };




    // save to localstorage

    highscores.push(newScore);

    window.localStorage.setItem("highscores", JSON.stringify(highscores));




    // redirect to next page

    window.location.href = "highscores.html";

  }

}




function checkForEnter(event) {


  if (event.key === "Enter") {

    saveHighscore();

  }

}




// submit initials

submitBtn.onclick = saveHighscore;




// start quiz

startBtn.onclick = startQuiz;




initialsEl.onkeyup = checkForEnter;