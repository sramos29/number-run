let lives = 3;
let score = 0;
let questionNumber = 0;   // how many questions have been asked
let total = 10;           // total questions in a round
let currentAnswer = null;
let level = "mixed"; // set from the teacher's chosen exercise on load

// Read the level the teacher picked, then start the game
async function loadLevel() {
  try {
    level = await getAssignedExercise();
  } catch {
    level = "mixed";
  }
  generateQuestion();
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  questionNumber++;

  // Decide which operation this question uses
  let op;
  if (level === "mixed") {
    op = ["+", "-", "×", "÷"][randInt(0, 3)];
  } else {
    op = { addition: "+", subtraction: "-", multiplication: "×", division: "÷" }[level] || "+";
  }

  let a, b;
  if (op === "+") {
    a = randInt(1, 10);
    b = randInt(1, 10);
    currentAnswer = a + b;
  } else if (op === "-") {
    a = randInt(1, 10);
    b = randInt(1, a);            // keeps the answer 0 or higher
    currentAnswer = a - b;
  } else if (op === "×") {
    a = randInt(2, 9);
    b = randInt(2, 9);
    currentAnswer = a * b;
  } else { // division
    b = randInt(2, 9);
    currentAnswer = randInt(2, 9);
    a = b * currentAnswer;        // guarantees a clean whole-number answer
  }

  document.getElementById('exercise-text').textContent = `Question ${questionNumber} of ${total}: What is ${a} ${op} ${b}?`;
  document.getElementById('result-box').textContent = '';
  document.getElementById('transcript-box').textContent = '';
}

function updateHearts() {
  const heartsEl = document.getElementById('hearts');
  heartsEl.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
}

function updateProgress() {
  const pct = (questionNumber / total) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('score').textContent = `${score} / ${total}`;
}

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Your browser does not support voice recognition. Try Chrome!');
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  document.getElementById('mic-btn').textContent = '🎙️ Listening...';
  recognition.onresult = (event) => {
    const said = event.results[0][0].transcript.trim().toLowerCase();
    document.getElementById('transcript-box').textContent = `You said: "${said}"`;
    checkAnswer(said);
  };
  recognition.onend = () => {
    document.getElementById('mic-btn').textContent = '🎤 Tap to Speak';
  };
}

// Turn whatever the student said into a number.
// Handles plain digits ("56") and words up to one hundred ("fifty six").
function wordsToNumber(text) {
  text = String(text).toLowerCase().trim();

  const digits = text.match(/\d+/);
  if (digits) return parseInt(digits[0], 10);

  const ones = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
    eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
    fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19
  };
  const tens = {
    twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90
  };

  const words = text.replace(/-/g, ' ').split(/\s+/);
  let totalValue = 0;
  let matched = false;
  for (const w of words) {
    if (w in ones) { totalValue += ones[w]; matched = true; }
    else if (w in tens) { totalValue += tens[w]; matched = true; }
    else if (w === 'hundred') { totalValue = (totalValue === 0 ? 1 : totalValue) * 100; matched = true; }
  }
  return matched ? totalValue : NaN;
}

async function finishGame(screenId, scoreFieldId) {
  const classCode = localStorage.getItem("joinedClassCode");
  const studentName = localStorage.getItem("studentName") || "Anonymous";
  if (classCode) await saveScore(classCode, studentName, score);
  document.getElementById('simulation').style.display = 'none';
  document.getElementById(screenId).style.display = 'block';
  document.getElementById(scoreFieldId).textContent = `You scored ${score} / ${total}`;
}

function checkAnswer(said) {
  const heard = wordsToNumber(said);
  const resultBox = document.getElementById('result-box');

  if (heard === currentAnswer) {
    resultBox.textContent = '✅ Correct! Great job!';
    resultBox.style.color = 'lightgreen';
    score++;
    updateProgress();
  } else {
    resultBox.textContent = `❌ Not quite! The answer was ${currentAnswer}`;
    resultBox.style.color = '#ff6b6b';
    lives--;
    updateHearts();
    if (lives <= 0) {
      setTimeout(() => finishGame('game-over', 'final-score-gameover'), 1000);
      return;
    }
  }

  // If all 10 questions have been asked, end the round and show the score
  if (questionNumber >= total) {
    setTimeout(() => finishGame('victory', 'final-score-victory'), 1000);
    return;
  }

  setTimeout(generateQuestion, 1500);
}

function restartGame() {
  lives = 3;
  score = 0;
  questionNumber = 0;
  updateHearts();
  updateProgress();
  document.getElementById('simulation').style.display = 'block';
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('victory').style.display = 'none';
  generateQuestion(); // keeps the same level the teacher assigned
}

updateHearts();
updateProgress();
loadLevel();
