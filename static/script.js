let questions = [];
let current = 0;
let score = 0;
let timeLeft = 15;
let timer;
let username = "";

function startGame(category) {
  username = document.getElementById('username').value;
  if (!username) {
    alert("Por favor, escribe tu nombre");
    return;
  }

  fetch(`/questions/${category}`)
    .then(res => res.json())
    .then(data => {
      questions = data;
      current = 0;
      score = 0;
      document.getElementById('menu-container').style.display = 'none';
      document.getElementById('quiz-container').style.display = 'block';
      document.getElementById('greeting').textContent = `¡Suerte, ${username}!`;
      loadQuestion();
    });
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById('time').textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);

  const q = questions[current];
  document.getElementById('question-box').textContent = q.question;
  const options = document.getElementById('options');
  options.innerHTML = '';
  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.onclick = () => {
      if (i === q.answer) score++;
      nextQuestion();
    };
    options.appendChild(li);
  });
}

function nextQuestion() {
  clearInterval(timer);
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById('quiz-container').innerHTML = `
      <h2>${username}, tu puntuación: ${score}/${questions.length}</h2>
      <button onclick="returnToMenu()">Volver al menú</button>
    `;
  }
}

function returnToMenu() {
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('menu-container').style.display = 'block';
}
