const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let matchedCards = 0;
let pauseGame = false;
let count = 0;

const startGameForm = document.querySelector('form')
const startBtn = document.getElementById('startButton')
const startInput = document.getElementById('cardAmount')

startBtn.addEventListener('click', function(e){
  e.preventDefault()
  if (startInput.value % 2 !== 0){
    startInput.value--;
  }
  startGameForm.remove();
  raiseDifficulty();
  shuffle(COLORS)
  createDivsForColors(shuffledColors);
})

// startInput.addEventListener('submit', function(e){
//   if (difficulty % 2 !== 0){
//     difficulty += 1;

//   }
// })

function counter(){
  count++
}
gameContainer.addEventListener('click', counter)

// add an input to decide how many cards you want played, must be % 2 === 0, and maybe change the colors to imgs.

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

const addColors = [
  'black',
  'black',
  'brown',
  'brown',
  'magenta',
  'magenta',
  'yellow',
  'yellow',
  'cyan',
  'cyan',
  'teal',
  'teal',
  'pink',
  'pink',
  'turquoise',
  'turquoise'
]

function raiseDifficulty(){
  for (let i = 10; i < startInput.value; i++){
      COLORS.push(addColors[i-10])
      // console.log(COLORS)
  }  
}


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (pauseGame) return;
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  const targetCard = event.target;
  targetCard.style.backgroundColor = targetCard.classList

  if (!card1 || !card2) {
    card1 = card1 || targetCard;
    card2 = targetCard === card1 ? null : targetCard;
  }

  if (card1 && card2){
    pauseGame = true;
    let cardClass1 = card1.className;
    let cardClass2 = card2.className;

    if(cardClass1 === cardClass2){
      matchedCards += 2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      pauseGame = false;
    } else {
      setTimeout(function(){
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1 = null;
        card2 = null;
        pauseGame = false;
      }, 1000)
    }
  }
  if (matchedCards === COLORS.length){
    gameContainer.removeEventListener('click', counter)
    gameContainer.remove()
    const gameWin = document.createElement('form');
    const winLabel = document.createElement('label');
    const resetBtn = document.createElement('button');
    const body = document.querySelector('body')
    resetBtn.classList.add('resetButton')

    winLabel.innerText = `You win! Your score is ${count + 1}.`
    resetBtn.innerText = 'Play again'
    winLabel.append(resetBtn);
    gameWin.append(winLabel);
    gameWin.classList.add('winningMessage')
    body.append(gameWin)
  }
}



// when the DOM loads
// createDivsForColors(shuffledColors);
