const arr1 = [
  [
    [41, 48, 83, 86, 17],
    [83, 86, 6, 31, 17, 9, 48, 53],
  ],
  [
    [13, 32, 20, 16, 61],
    [61, 30, 68, 82, 17, 32, 24, 19],
  ],
  [
    [1, 21, 53, 59, 44],
    [69, 82, 63, 72, 16, 21, 14, 1],
  ],
  [
    [41, 92, 73, 84, 69],
    [59, 84, 76, 51, 58, 5, 54, 83],
  ],
  [
    [87, 83, 26, 28, 32],
    [88, 30, 70, 12, 93, 22, 82, 36],
  ],
  [
    [1, 18, 13, 56, 72],
    [74, 77, 10, 23, 35, 67, 36, 11],
  ],
];

const arr2 = [
  [
    [41, 48, 83, 86, 17],
    [83, 86, 6, 31, 17, 9, 48, 53],
  ],
  [
    [13, 32, 20, 16, 61],
    [61, 30, 68, 82, 17, 32, 24, 19],
  ],
  [
    [1, 21, 53, 59, 44],
    [69, 82, 63, 72, 16, 21, 14, 1],
  ],
  [
    [41, 92, 73, 84, 69],
    [59, 84, 76, 51, 58, 5, 54, 83],
  ],
  [
    [87, 83, 26, 28, 32],
    [88, 30, 70, 12, 93, 22, 82, 36],
  ],
  [
    [31, 18, 13, 56, 72],
    [74, 77, 10, 23, 35, 67, 36, 11],
  ],
];

function winningNumbersPart1(arr) {
  let scratchcards = new Array(arr.length).fill(1);
  for (let i = 0; i < arr.length; i++) {
    let winningPairs = arr[i][1].filter((element) =>
      arr[i][0].includes(element)
    );
    winningScore +=
      winningPairs.length !== 0 ? Math.pow(2, winningPairs.length - 1) : 0;
  }

  return winningScore;
}

function winningNumbersPart2(arr) {
  let scratchcards = new Array(arr.length).fill(1);
  for (let i = 0; i < arr.length; i++) {
    let winningPairs = arr[i][1].filter((element) =>
      arr[i][0].includes(element)
    );
    for (let j = 0; j < winningPairs.length; j++) {
      scratchcards[i + j + 1] = scratchcards[i + j + 1] + scratchcards[i];
    }
  }
  return scratchcards.reduce((x, y) => x + y, 0);
}
