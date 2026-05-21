let lives = 3;
let score = 0;
let total = 10;
let currentAnswer = null;

function generateQuestion() {
  const ops = ['+', '-'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b;
}

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
