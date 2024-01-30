// helpers

// helper to hash an array to store it into a dictionary
function simpleHash(input) {
  let hash = 0;
  if (input.length === 0) return hash;

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }

  return hash.toString();
}

const hashDict = {};

//helper to rotate a matrix 90 degrees
function rotate90Degrees(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Create a new matrix with swapped dimensions
  const rotatedMatrix = new Array(cols).fill(null).map(() => new Array(rows));

  // Perform the rotation
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotatedMatrix[j][rows - i - 1] = matrix[i][j];
    }
  }

  return rotatedMatrix;
}

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

// helper to return an array after a full cycle is done
const cycle = (inputArr) => {
  let cycleArr = inputArr.map((elArr) => elArr.slice());
  for (let i = 0; i < 4; i++) {
    cycleArr = tiltPlatformNorth(cycleArr);
    cycleArr = rotate90Degrees(cycleArr);
  }

  return cycleArr;
};

// find the repetive cycle
const findCycle = (inputArr) => {
  let cycleArr = inputArr.map((elArr) => elArr.slice());

  let i = 1;
  while (true) {
    cycleArr = cycle(cycleArr);
    const hash = simpleHash(cycleArr.join(""));
    if (hashDict[hash]) {
      const cycleLength = i - hashDict[hash][1];
      return { cycleArr, spinIndex: i, cycleLength };
    } else {
      hashDict[hash] = [cycleArr, i];
      i++;
    }
  }
};

// find the final array after all the 1 billion cycles
const finishCycles = (inputArr, spinIndex, cycleLength) => {
  let spinsRemaining = BigInt(1000000000n - BigInt(spinIndex));
  const fullCycles = BigInt(spinsRemaining / BigInt(cycleLength));
  spinsRemaining = BigInt(
    spinsRemaining - BigInt(fullCycles * BigInt(cycleLength))
  );
  let solutionArr = inputArr.map((elArr) => elArr.slice());

  while (spinsRemaining !== BigInt(0)) {
    solutionArr = cycle(solutionArr);
    spinsRemaining = BigInt(spinsRemaining - BigInt(1));
  }

  return solutionArr;
};

// the main solution fn
const parabolicDish = (arr) => {
  const formatArray = arr.map((str) => str.split(""));
  const { cycleArr, spinIndex, cycleLength } = findCycle(formatArray);
  const solutionsArray = finishCycles(cycleArr, spinIndex, cycleLength);

  console.log(computeWeight(solutionsArray));
};

parabolicDish(arr);
