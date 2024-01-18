function getMinDistance(arr1, arr2) {
  return Math.abs(arr2[0] - arr1[0]) + Math.abs(arr2[1] - arr1[1]);
}

function transpose(arr) {
  let i,
    j,
    outputArr = [];
  const keysArr = arr[0].split("");
  for (i = 0; i < keysArr.length; i++) {
    outputArr[i] = arr.map((row) => row[i]).join("");
  }
  return outputArr;
}

function expandUniverse01(arr) {
  // expand vertical
  let i, j;
  for (i = 0; i < arr.length; i++) {
    if (!arr[i].includes("#")) {
      const str = new Array(arr[i].length + 1).join(".");
      arr.splice(i, 0, str);
      i += 1;
    }
  }

  // expand horizontal
  let transposeArr = transpose(arr);
  for (j = 0; j < transposeArr.length; j++) {
    if (!transposeArr[j].includes("#")) {
      const str = new Array(transposeArr[j].length + 1).join(".");
      transposeArr.splice(j, 0, str);
      j += 1;
    }
  }

  return transpose(transposeArr);
}

function getGalaxiesCoordinates(arr) {
  let i,
    j,
    coordArr = [];
  for (i = 0; i < arr.length; i++) {
    const arrRow = arr[i].split("");
    for (j = 0; j < arrRow.length; j++) {
      if (arr[i][j] === "#") {
        coordArr.push([j, i]);
      }
    }
  }

  return coordArr;
}

function cosmicExpansion01(arr) {
  let i,
    j,
    sum = 0;
  const coordArr = getGalaxiesCoordinates(expandUniverse(arr));

  for (i = 0; i < coordArr.length; i++) {
    for (j = i + 1; j < coordArr.length; j++) {
      sum += getMinDistance(coordArr[i], coordArr[j]);
    }
  }

  return sum;
}

cosmicExpansion01(arr);

// Part 02

function expandUniverse02(arr) {
  // expand vertical
  let i,
    j,
    expandYArr = [],
    expandXArr = [];
  for (i = 0; i < arr.length; i++) {
    if (!arr[i].includes("#")) {
      expandYArr.push(i);
    }
  }

  // expand horizontal
  let transposeArr = transpose(arr);
  for (j = 0; j < transposeArr.length; j++) {
    if (!transposeArr[j].includes("#")) {
      expandXArr.push(j);
    }
  }

  return [expandXArr, expandYArr];
}

function cosmicExpansion02(arr) {
  let i,
    j,
    k,
    l,
    sum = 0;
  const coordArr = getGalaxiesCoordinates(arr);
  const expandArr = expandUniverse(arr);

  for (i = 0; i < coordArr.length; i++) {
    const A = coordArr[i];
    for (j = i + 1; j < coordArr.length; j++) {
      const B = coordArr[j];
      let extraSum = 0;
      for (k = 0; k < expandArr[0].length; k++) {
        if (
          (A[0] <= expandArr[0][k] && B[0] >= expandArr[0][k]) ||
          (A[0] >= expandArr[0][k] && B[0] <= expandArr[0][k])
        ) {
          extraSum += 1000000 - 1;
        }
      }
      for (l = 0; l < expandArr[1].length; l++) {
        if (A[1] <= expandArr[1][l] && B[1] >= expandArr[1][l]) {
          extraSum += 1000000 - 1;
        }
      }
      sum += getMinDistance(A, B) + extraSum;
    }
  }

  return sum;
}

cosmicExpansion02(arr);
