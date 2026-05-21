let lives = 3;
let score = 0;
let total = 10;
let currentAnswer = null;

function generateQuestion() {
  const ops = ['+', '-'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b;

  if (op === '+') {
    a = Math.floor(Math.random() * 10) + 1;
    b = Math.floor(Math.random() * (10 - a)) + 1;
  } else {
    a = Math.floor(Math.random() * 10) + 1;
    b = Math.floor(Math.random() * a) + 1;
  }

  currentAnswer = op === '+' ? a + b : a - b;
  document.getElementById('exercise-text').textContent = `What is ${a} ${op} ${b}?`;
  document.getElementById('result-box').textContent = '';
  document.getElementById('transcript-box').textContent = '';
}

function updateHearts() {
  const heartsEl = document.getElementById('hearts');
  heartsEl.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
}

function updateProgress() {
  const pct = (score / total) * 100;
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

function checkAnswer(said) {
  const spokenNumbers = {
    'zero':0,'one':1,'two':2,'three':3,'four':4,
    'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10
  };

  let heard = parseInt(said);
  if (isNaN(heard)) heard = spokenNumbers[said];

  const resultBox = document.getElementById('result-box');

  if (heard === currentAnswer) {
    resultBox.textContent = '✅ Correct! Great job!';
    resultBox.style.color = 'green';
    score++;
    updateProgress();
    if (score >= total) {
      setTimeout(() => {
        document.getElementById('simulation').style.display = 'none';
        document.getElementById('victory').style.display = 'block';
      }, 1000);
      return;
    }
  } else {
    resultBox.textContent = `❌ Not quite! The answer was ${currentAnswer}`;
    resultBox.style.color = 'red';
    lives--;
    updateHearts();
    if (lives <= 0) {
      setTimeout(() => {
        document.getElementById('simulation').style.display = 'none';
        document.getElementById('game-over').style.display = 'block';
      }, 1000);
      return;
    }
  }

  setTimeout(generateQuestion, 1500);
}

function restartGame() {
  lives = 3;
  score = 0;
  updateHearts();
  updateProgress();
  document.getElementById('simulation').style.display = 'block';
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('victory').style.display = 'none';
  generateQuestion();
}

generateQuestion();
updateHearts();
updateProgress();