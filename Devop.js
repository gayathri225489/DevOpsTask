const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const restartBtn = document.getElementById('restart-btn');

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Bengaluru", "Kolkata"],
    correct: "New Delhi"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Saturn", "Jupiter"],
    correct: "Mars"
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    correct: "12"
  }
  // add more questions here
];

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  showQuestion();
  updateNavButtons();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionTextElement.innerText = q.question;
  optionsContainer.innerHTML = ''; // clear previous

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.classList.add('option-btn');
    btn.addEventListener('click', () => selectOption(btn, option, q.correct));
    optionsContainer.appendChild(btn);
  });
}

function selectOption(button, selectedOption, correctOption) {
  // disable all options once one is chosen
  const optionButtons = optionsContainer.querySelectorAll('button');
  optionButtons.forEach(btn => btn.disabled = true);

  if (selectedOption === correctOption) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
    // highlight correct option
    optionButtons.forEach(btn => {
      if (btn.innerText === correctOption) {
        btn.classList.add('correct');
      }
    });
  }
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  }
  updateNavButtons();
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
  updateNavButtons();
}

function updateNavButtons() {
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

function finishQuiz() {
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreElement.innerText = score;
  totalQuestionsElement.innerText = questions.length;
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
  // If last question, finish
  if (currentQuestionIndex === questions.length - 1) {
    finishQuiz();
  } else {
    nextQuestion();
  }
});
prevBtn.addEventListener('click', prevQuestion);
restartBtn.addEventListener('click', startQuiz);
