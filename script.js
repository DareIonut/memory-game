//selectors
const gameContainer = document.querySelector(".container");
const display = document.querySelector("#game-info");
const moves = document.querySelector(".moves");
const randomNumbers = getRandom();

//create the map

let map = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

//iterate through the map
function randomizeArray() {
  let temp = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      map[i][j] = randomNumbers[temp];
      createItems(map[i][j]);
      temp = temp + 1;
    }
  }
}
randomizeArray();
squareNumbers();

//functions
function createItems(value) {
  const circle = document.createElement("DIV");
  circle.classList.add("circle");
  circle.dataset.value = `${value}`;
  gameContainer.appendChild(circle);
}
function getRandom() {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8], //all numbers to be randomized
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
  const circles = document.querySelectorAll(".circle");
  //Set an empty array
  let tempArr = [];
  let countMoves = 0;
  //EVENT
  circles.forEach((target) => {
    target.addEventListener("click", (e) => {
      countMoves = countMoves + 1;
      moves.innerHTML = countMoves;
      //pushing in array
      target.classList.add("flip-scale-up-ver");
      target.addEventListener("animationend", () => {
        target.innerHTML = target.dataset.value;
        target.classList.add("taped");
      });
      tempArr.push(target.dataset.value);
      //if there is equal you were right
      if (tempArr[0] === tempArr[1]) {
        display.innerHTML = "It's a match!";
      } else if (tempArr.length == 2 && tempArr[0] !== tempArr[1]) {
        let num1 = tempArr[0];
        let num2 = tempArr[1];
        display.innerHTML = "You're wrong!";
        console.log(tempArr);
        setTimeout(clearWrongNumbers, 1000);
        function clearWrongNumbers() {
          circles.forEach((target) => {
            if (target.innerHTML === num1 || target.innerHTML === num2) {
              target.classList.remove("flip-scale-up-ver");
              target.classList.remove("taped");
              target.innerHTML = "";
              display.innerHTML = "Try again!";
            }
          });
        }
      }

      //when the length of the array is two, reset the array
      if (tempArr.length === 2) {
        tempArr = [];
      }
    });
  });
}

//testing
