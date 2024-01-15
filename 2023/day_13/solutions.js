function areSame(arr1, arr2) {
  let i, j;
  for (i = 0; i < arr1.length; i++) {
    for (j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return 0;
      }
    }
  }
  return 1;
}

function checkHorizontal(arr, rowNumber) {
  const middle = Math.floor(arr.length / 2);

  let minIndex, maxIndex;
  if (rowNumber <= middle) {
    minIndex = 0;
    maxIndex = 2 * rowNumber;
  } else {
    minIndex = rowNumber - (arr.length - rowNumber);
    maxIndex = arr.length;
  }
  const arrA1X = arr.slice(minIndex, rowNumber);
  const arrB1X = arr.slice(rowNumber, maxIndex).reverse();

  return areSame(arrA1X, arrB1X);
}

function transpose(arr) {
  let i,
    j,
    outputArr = [];
  const keysArr = arr[0].split("");
  // const output = arr[0].split('').map((_, colIndex) => arr.map(row => row[colIndex]).join(''));
  for (i = 0; i < keysArr.length; i++) {
    outputArr[i] = arr.map((row) => row[i]).join("");
  }
  return outputArr;
}

function pointOfIncidence(arr) {
  let i, j;
  let horizontalSum = 0;
  let verticalSum = 0;
  for (i = 0; i < arr.length; i++) {
    // check for horizonal mirror
    for (j = 1; j < arr[i].length; j++) {
      if (checkHorizontal(arr[i], j)) {
        horizontalSum = horizontalSum + 100 * j;
        break;
      }
    }

    // transpose the array
    let trasposedArr = transpose(arr[i]);

    // check for vertical mirror
    for (j = 1; j < trasposedArr.length; j++) {
      if (checkHorizontal(trasposedArr, j)) {
        verticalSum = verticalSum + j;
        break;
      }
    }
  }

  return horizontalSum + verticalSum;
}

pointOfIncidence(arrMatrix2);

// for part 02
function areSameWithSmudge(arr1, arr2) {
  let i,
    j,
    smudge = 0;
  for (i = 0; i < arr1.length; i++) {
    for (j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        smudge++;
        if (smudge > 1) return 0;
      }
    }
  }
  if (smudge === 1) {
    return 1;
  } else {
    return 0;
  }
}
