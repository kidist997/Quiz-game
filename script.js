const questions = [
  {
    question: "What is the capital city of Ethiopia?",
    answers: [
      { text: "Hawassa", correct: false },
      { text: "Addis Ababa", correct: true },
      { text: "Nazret", correct: false },
      { text: "Mekelle", correct: false },
    ],
  },

  {
    question: "Which one is the chemical formula for water?",
    answers: [
      { text: "SO₂", correct: false },
      { text: "CO₂", correct: false },
      { text: "H₂O", correct: true },
      { text: "NO", correct: false },
    ],
  },
  {
    question: "HTML stands for Hypertext Markup Language.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "CSS is used to write the structure of a web page.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "How many planets are in our solar system?",
    answers: [
      { text: "10", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
let currentIndex = 0;
let score = 0;
function startQuiz() {
  currentIndex = 0;
  score = 0;
  displayQuestion();
}

function displayQuestion() {
  reState();
  let currentQuestion = questions[currentIndex];
  let questionNumber = currentIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correctAnswer = selectedButton.dataset.correct === "true";
  if (correctAnswer) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function reState() {
  nextButton.style.display = "none";
  restartButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    displayQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentIndex < questions.length) {
    nextQuestion();
  } else {
    startQuiz();
  }
});
function showScore() {
  reState();
  if (score >= 4) {
    questionElement.innerHTML = `👏Congrats you scored ${score} out of ${questions.length}!`;
  } else {
    questionElement.innerHTML = `You need to read more! you scored ${score} out of ${questions.length}!`;
  }
  restartButton.style.display = "block";
}
restartButton.addEventListener("click", () => {
  startQuiz();
});
startQuiz();
