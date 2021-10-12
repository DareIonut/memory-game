class GameEngine {
  constructor() {
    //selectors
    this.gameContainer = document.querySelector(".container");
    this.display = document.querySelector("span");
    this.randomNumbers = this.getRandom();
    this.allSquares = document.querySelectorAll(".game-engine");
    //creating the map and assign a number
    let map = [
      [1, 1, 0, 0],
      [1, 0, 0, 1],
      [0, 1, 0, 0],
      [1, 1, 0, 1],
    ];

    //iterate through the map
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 1) {
          this.firstChoice();
        } else if (map[i][j] === 0) {
          this.pairChoice();
        }
      }
    }
  }
  //Main functionality

  firstChoice() {
    //Create and append the circle
    const circle = document.createElement("DIV");
    circle.classList.add("circle");
    circle.classList.add("game-engine");
    this.gameContainer.appendChild(circle);
  }
  pairChoice() {
    const pairCircle = document.createElement("DIV");
    pairCircle.classList.add("pair-circle");
    pairCircle.classList.add("game-engine");
    this.gameContainer.appendChild(pairCircle);
  }
  getRandom() {
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
  giveNum(square) {
    let j = 0;
    while (j < this.randomNumbers.length) {
      for (let i = 0; i < square.length; i++) {
        square[i].dataset.squareValue = this.randomNumbers[i];
      }
      j++;
    }
  }

  play(target) {
    //Selecting all the squares
    const squaresRed = document.querySelectorAll(".circle");
    const squaresBlack = document.querySelectorAll(".pair-circle");

    this.giveNum(squaresRed);
    this.giveNum(squaresBlack);
    //Set an empty array
    let tempArr = [];

    target.addEventListener("click", (e) => {
      console.log("");
      //pushing in array
      tempArr.push(target.dataset.squareValue);
      target.innerHTML = target.dataset.squareValue;
      //if there is equal you were right
      if (tempArr[0] === tempArr[1]) {
        this.display.innerHTML = "It's a match!";
      } else if (tempArr.length == 2 && tempArr[0] !== tempArr[1]) {
        let num1 = tempArr[0];
        let num2 = tempArr[1];
        this.display.innerHTML = "You're wrong!";
        setTimeout(function () {
          this.allSquares.forEach((target) => {
            if (target.innerHTML === num1 || target.innerHTML === num2) {
              target.innerHTML = "";
              GameEngine.display.innerHTML = "Try again!";
            }
          });
        }, 1000);
      }
      //when the length of the array is two, reset the array
      if (tempArr.length === 2) {
        tempArr = [];
      }
    });
  }
}

let pair = new GameEngine();

//EVENT
pair.allSquares.forEach((target) => {
  pair.play(target);
});
