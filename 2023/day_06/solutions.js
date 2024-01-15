const inputArr = [
  [7, 15, 30],
  [9, 40, 200],
];

const inputArr2 = [[35696887], [213116810861248]];

function waitForIt(arr) {
  let noOfWays = 1;
  for (let i = 0; i < arr[0].length; i++) {
    const time = arr[0][i];
    const distance = arr[1][i];
    let minTime = (time - Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2;
    if (Number.isInteger(minTime)) {
      minTime++;
    } else {
      minTime = Math.ceil(minTime);
    }

    let maxTime = (time + Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2;

    if (Number.isInteger(maxTime)) {
      maxTime--;
    } else {
      maxTime = Math.floor(maxTime);
    }

    noOfWays = noOfWays * (maxTime - minTime + 1);
  }

  return noOfWays;
}

waitForIt(inputArr2);
