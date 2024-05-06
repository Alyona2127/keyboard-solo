const word = document.querySelector('.word');
const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
const timer = document.querySelector('#timer');

const words = ['apple', 'banana', 'peach', 'melon', 'unicorn', 'language', 'sport', 'hello', 'world'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function clearData() {
  correctCount.textContent = '0';
  wrongCount.textContent = '0';
  timer.textContent = '00:00';
  clearInterval(timerId);
}

function setRandomWord() {
  word.innerHTML = '';
  const newWord = words[getRandomInt(0, 9)];
  for (let i = 0; i < newWord.length; i++) {
    const span = document.createElement('span');
    span.textContent = newWord[i];
    word.append(span);
  }
 }

 function wordFinished(spans) {
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        if (!span.classList.contains('c')) {
            return false;
        }
    }
    return true;
 }

 function checkSymbol (key, spans) {
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];

        if (span.classList.contains('c')) {
            continue;
        }

        if (span.textContent === key) {
            span.classList.remove('w');
            span.classList.add('c');
            break;
        } else {
            span.classList.add('w');
            wordMistakes.textContent = ++wordMistakes.textContent;
            break;
        }
    }
 }

 function chekEndGame() {
  if (correctCount.textContent === '5') {
      alert(`Победа! Ваше время ${timer.textContent}`);
      clearData();
  }

  if (wrongCount.textContent === '5') {
      alert(`Сегодня не Ваш день:(`);
      clearData();
  }
  setRandomWord();
}

 const timerId = setInterval(() => {
  
    const timerData = timer.textContent.split(':');
    const minutesString = timerData[0];
    const secondsString = timerData[1];
    
    let minutes = parseInt(minutesString);
    let seconds = parseInt(secondsString);
    
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
   
    timer.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  }, 1000);

document.addEventListener('keydown', function (event) { 

  const spans = word.querySelectorAll('span');
  checkSymbol (event.key, spans);

  if (wordFinished(spans)) {
    correctCount.textContent = ++correctCount.textContent;
    if (parseInt(wordMistakes.textContent) > 0) {
        wrongCount.textContent = ++wrongCount.textContent;
    }
    wordMistakes.textContent = '0';
    setTimeout(() => chekEndGame(), 0);
  }
});

setRandomWord();