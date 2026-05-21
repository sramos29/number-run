let lives = 3;
let score = 0;
let total = 10;
let currentAnswer = null;

function generateQuestion() {
  const ops = ['+', '-'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b;