const diffArr = (arr) => {
  let i,
    diffArray = [];
  for (i = 1; i < arr.length; i++) {
    diffArray.push(arr[i] - arr[i - 1]);
  }
  return diffArray;
};

const mirage01 = (arr) => {
  let i,
    j,
    sum = 0,
    predictionVal = 0;
  for (i = 0; i < arr.length; i++) {
    let stepArr = arr[i];
    let nestedArr = [arr[i]];
    while (stepArr.find((el) => el !== 0)) {
      stepArr = diffArr(stepArr);
      nestedArr.push(stepArr);
    }
    nestedArr.reverse();
    for (j = 1; j < nestedArr.length; j++) {
      // console.log(nestedArr[j].length);
      nestedArr[j].push(
        nestedArr[j][nestedArr[j].length - 1] +
          nestedArr[j - 1][nestedArr[j - 1].length - 1]
      );
      if (j === nestedArr.length - 1) {
        predictionVal = nestedArr[j][nestedArr[j].length - 1];
      }
    }
    sum += predictionVal;
  }
  return sum;
};

const mirage02 = (arr) => {
  let i,
    j,
    sum = 0,
    predictionVal = 0;
  for (i = 0; i < arr.length; i++) {
    let stepArr = arr[i];
    let nestedArr = [arr[i]];
    while (stepArr.find((el) => el !== 0)) {
      stepArr = diffArr(stepArr);
      nestedArr.push(stepArr);
    }
    nestedArr.reverse();
    for (j = 1; j < nestedArr.length; j++) {
      nestedArr[j].unshift(nestedArr[j][0] - nestedArr[j - 1][0]);
      if (j === nestedArr.length - 1) {
        predictionVal = nestedArr[j][0];
      }
    }
    sum += predictionVal;
  }
  return sum;
};
