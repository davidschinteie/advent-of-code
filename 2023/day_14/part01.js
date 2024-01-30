const arr = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

// helper to compute the weight of a given solution Array
const computeWeight = (arr) => {
  let totalLoad = 0;
  for (let i = 0; i < arr.length; i++) {
    const rowLoad = arr[i].filter((el) => el === "O").length;
    totalLoad += rowLoad * (arr.length - i);
  }
  return totalLoad;
};

// helper to tilt the platform to north
const tiltPlatformNorth = (inputArr) => {
  const tiltedArr = inputArr.map((elArr) => elArr.slice());

  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < inputArr[i].length; j++) {
      if (inputArr[i][j] === "O") {
        let row_up = i - 1;
        while (row_up >= 0 && tiltedArr[row_up][j] === ".") {
          row_up--;
        }
        if (row_up + 1 !== i) {
          tiltedArr[i][j] = ".";
        }
        tiltedArr[row_up + 1][j] = "O";
      }
    }
  }

  return tiltedArr;
};

const parabolicDish = (arr) => {
  const formatArray = arr.map((str) => str.split(""));
  const solutionArr = tiltPlatformNorth(formatArray);

  return computeWeight(solutionArr);
};

console.log(parabolicDish(arr));
