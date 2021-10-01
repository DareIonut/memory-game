//selectors
const gameContainer = document.querySelector(".container");
const randomNumbers = getRandom();

//create the map

let map = [
  [0, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
  [1, 1, 0, 1],
];

//iterate through the map
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === 1) {
      drawRed();
    } else if (map[i][j] === 0) {
      drawBlack();
    }
  }
}

//functions
function drawRed() {
  const square = document.createElement("DIV");
  square.classList.add("square");
  square.classList.add("game-engine");
  gameContainer.appendChild(square);
}
function drawBlack() {
  const squareBlack = document.createElement("DIV");
  squareBlack.classList.add("square-black");
  squareBlack.classList.add("game-engine");
  gameContainer.appendChild(squareBlack);
}
function getRandom() {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8], //all numbers to be randomized
    ranNums = [],
    i = nums.length,
    j = 0;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[j]);
    nums.splice(j, 1);
  }
  return ranNums;
}
function squareNumbers() {
  //Selecting all the squares
  let squaresRed = document.querySelectorAll(".square");
  let squaresBlack = document.querySelectorAll(".square-black");
  let allSquares = document.querySelectorAll(".game-engine");
  giveNum(squaresRed);
  giveNum(squaresBlack);
  //Set an empty array
  let tempArr = [];
  //EVENT
  allSquares.forEach((target) => {
    target.addEventListener("click", (e) => {
      //pushing in array
      tempArr.push(target.dataset.squareValue);
      console.log(tempArr);
      target.innerHTML = target.dataset.squareValue;
      //if there is equal you were right
      if (tempArr[0] === tempArr[1]) {
        console.log("It is a match");
      } else if (tempArr.length == 2 && tempArr[0] !== tempArr[1]) {
        console.log("You were wrong");
        allSquares.forEach((target) => {
          if (
            target.innerHTML === tempArr[0] ||
            target.innerHTML === tempArr[1]
          ) {
            target.innerHTML = "";
          }
        });
      }
      //when the length of the array is two, reset the array
      if (tempArr.length === 2) {
        tempArr = [];
      }
    });
  });
}
function giveNum(square) {
  let j = 0;
  while (j < randomNumbers.length) {
    for (let i = 0; i < square.length; i++) {
      square[i].dataset.squareValue = randomNumbers[i];
    }
    j++;
  }
}
squareNumbers();
//testing
console.log(gameContainer);
