// Quiz questions
var quizQuestions = [
    {
      question: "What is JavaScript?",
      answers: [
        "A scripting or programming language",
        "A markup language",
        "A database language",
        "A style sheet language",
      ],
      correctAnswer: "A scripting or programming language",
    },
    {
      question: "What is the latest version of JavaScript?",
      answers: ["ES5", "ES6", "ES7", "ES8"],
      correctAnswer: "ES8",
    },
    {
      question: "What is a closure in JavaScript?",
      answers: [
        "A function that returns another function",
        "A block of code that can be executed whenever",
        "A loop that iterates over an object's properties",
        "A mechanism for storing a function's variables",
      ],
      correctAnswer: "A mechanism for storing a function's variables",
    },
  ];
  
  // Quiz state
  var quizState = {
    currentQuestionIndex: 0,
    timeLeft: 60,
    score: 0,
  };
  
  // elements
  var quizContainer = document.getElementById("quiz-container");
  var scoreContainer = document.getElementById("score-container");
  var startButton = document.getElementById("start-button");
  
  // Event listener
startButton.addEventListener("click", startQuiz);

// Functions
function startQuiz() {
  // Hide start button
  startButton.style.display = "none";

  // Start timer
  var intervalId = setInterval(function () {
    quizState.timeLeft--;
    if (quizState.timeLeft === 0) {
      clearInterval(intervalId);
      endQuiz();
    }
  }, 1000);

  // Display first question
  displayQuestion();
}

function displayQuestion() {
  var currentQuestion = quizQuestions[quizState.currentQuestionIndex];

  // Create question element
  var questionElement = document.createElement("h2");
  questionElement.textContent = currentQuestion.question;
  quizContainer.appendChild(questionElement);

  // Create answer elements
  currentQuestion.answers.forEach(function (answer) {
    var answerElement = document.createElement("button");
    answerElement.textContent = answer;
    quizContainer.appendChild(answerElement);
    answerElement.addEventListener("click", function () {
      if (answer === currentQuestion.correctAnswer) {
        quizState.score++;
      } else {
        quizState.timeLeft -= 10;
      }

      // Remove question and answers from DOM
      questionElement.remove();
      answerElement.remove();

      // Go to next question or end quiz
      if (quizState.currentQuestionIndex === quizQuestions.length - 1) {
        endQuiz();
      } else {
        quizState.currentQuestionIndex++;
        displayQuestion();
      }
    });
  });
}

function endQuiz() {
  // Hide quiz container
  quizContainer.style.display = "none";

  // Display score
  var scoreElement = document.createElement("p");
  scoreElement.textContent = `Your score: ${quizState.score}`;
  scoreContainer.appendChild(scoreElement);

  // Save score
  var initials = prompt("Enter your initials:");
  var highScore = { initials, score: quizState.score };
  var highScores = JSON.parse(localStorage.getItem("highScores"));
}