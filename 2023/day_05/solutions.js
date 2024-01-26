const arr = [
  [79, 14, 55, 13],
  [
    [50, 98, 2],
    [52, 50, 48],
  ],
  [
    [0, 15, 37],
    [37, 52, 2],
    [39, 0, 15],
  ],
  [
    [49, 53, 8],
    [0, 11, 42],
    [42, 0, 7],
    [57, 7, 4],
  ],
  [
    [88, 18, 7],
    [18, 25, 70],
  ],
  [
    [45, 77, 23],
    [81, 45, 19],
    [68, 64, 13],
  ],
  [
    [0, 69, 1],
    [1, 0, 69],
  ],
  [
    [60, 56, 37],
    [56, 93, 4],
  ],
];

const mergeIntervals = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);
  let result = [intervals[0][0], intervals[0][1]];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[result.length - 1][1]) {
      result[result.length - 1][1] = Math.max(
        result[result.length - 1][1],
        intervals[i][1]
      );
    } else {
      intervals.push(intervals[i]);
    }
  }

  return result;
};

const sourceMap = (arr) => {
  let i,
    destRange = [],
    sourceRange = [];

  for (i = 0; i < arr.length; i++) {
    const destMin = arr[i][0];
    const destMax = arr[i][0] + arr[i][2] - 1;
    const sourceMin = arr[i][1];
    const sourceMax = arr[i][1] + arr[i][2] - 1;
    destRange.push([destMin, destMax]);
    sourceRange.push([sourceMin, sourceMax]);
  }

  return { source: sourceRange, dest: destRange };
};

const mapSeedToDest = (seed, sourceArr, destArr) => {
  for (let i = 0; i < sourceArr.length; i++) {
    if (seed >= sourceArr[i][0] && seed <= sourceArr[i][1]) {
      return destArr[i][0] + seed - sourceArr[i][0];
    }
  }
  return seed;
};

const seedFertilizer = (arr) => {
  let seeds = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const seedMap = sourceMap(arr[i]);

    for (let j = 0; j < seeds.length; j++) {
      seeds[j] = mapSeedToDest(seeds[j], seedMap.source, seedMap.dest);
    }
  }

  seeds.sort((a, b) => a - b);

  return seeds[0];
};

console.log(seedFertilizer(arr));

// Part 02

// function to check if two arrays have the same values
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

// function to return the array of intersection between two lists/ranges/intervals of numbers
const intersection = (arrA, arrB) => {
  const rangeMin = arrA[0] < arrB[0] ? arrA : arrB;
  const rangeMax = arrayEquals(rangeMin, arrA) ? arrB : arrA;

  const rangeMinEnd = rangeMin[rangeMin.length - 1];
  const rangeMaxEnd = rangeMax[rangeMax.length - 1];

  if (rangeMinEnd < rangeMax[0]) {
    return null;
  }
  return [rangeMax[0], Math.min(rangeMinEnd, rangeMaxEnd)];
};

// function to subtract the list/range of numbers arrB from another list/range of numbers arrA
const substract = (arrA, arrB) => {
  const diferences = [];
  if (arrA[0] < arrB[0]) {
    if (arrA[1] === arrB[0]) {
      if (arrA[0] === arrA[1] - 1) {
        return [arrA[0]];
      } else {
        return [arrA[0], arrA[1] - 1];
      }
    }
    if (arrA[1] <= arrB[1]) {
      if (arrA[0] === arrB[0] - 1) {
        return [arrA[0]];
      } else {
        return [arrA[0], arrB[0] - 1];
      }
    }
    if (arrA[1] > arrB[1]) {
      if (arrA[0] === arrB[0] - 1) {
        diferences.push([arrA[0]]);
      } else {
        diferences.push([arrA[0], arrB[0] - 1]);
      }
      if (arrA[1] === arrB[1] + 1) {
        diferences.push([arrA[1]]);
      } else {
        diferences.push([arrB[1] + 1, arrA[1]]);
      }
      return diferences;
    }
  } else if (arrA[0] >= arrB[0] && arrA[0] < arrB[1]) {
    if (arrA[1] <= arrB[1]) {
      return null;
    } else if (arrA[1] > arrB[1]) {
      if (arrA[1] === arrB[1] + 1) {
        return [arrA[1]];
      } else {
        return [arrB[1] + 1, arrA[1]];
      }
    }
  } else if (arrA[0] === arrB[1]) {
    return [arrA[0] + 1, arrA[1]];
  }
};

// function to flatten a given array
function flattenArray(nestedArray) {
  return nestedArray.reduce((flatArray, item) => {
    return flatArray.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

// function to reshape into pairs a given array
function reshapeArray(flattenedArray) {
  let reshapedArray = [];
  for (let i = 0; i < flattenedArray.length; i += 2) {
    reshapedArray.push([flattenedArray[i], flattenedArray[i + 1]]);
  }
  return reshapedArray;
}

const mapSeedToDest02 = (seeds, sourceArr, destArr) => {
  let seedArr = seeds,
    solutionArr = [];

  for (let i = 0; i < sourceArr.length; i++) {
    const intersectionArr = intersection(seedArr, sourceArr[i]);

    if (intersectionArr === null) {
      continue;
    }

    const solutionRangeMin =
      destArr[i][0] + intersectionArr[0] - sourceArr[i][0];
    const solutionRangeMax =
      destArr[i][0] + intersectionArr[1] - sourceArr[i][0];

    if (solutionRangeMin === solutionRangeMax) {
      solutionArr.push([solutionRangeMin]);
    } else {
      solutionArr.push([solutionRangeMin, solutionRangeMax]);
    }

    seedArr = substract(seedArr, intersectionArr);

    if (seedArr != null && seedArr[0].constructor === Array) {
      seedArr.forEach((el) => {
        const tempResult = mapSeedToDest02(el, sourceArr, destArr);
        solutionArr.push(...tempResult);
        solutionArr = reshapeArray(flattenArray(solutionArr));
        seedArr = null;
      });
      break;
    }
    if (seedArr == null) break;
  }

  if (seedArr != null && seedArr.length !== 0) {
    solutionArr.push(seedArr);
  }

  return solutionArr;
};

const seedFertilizer02 = (arr) => {
  let seeds = arr[0],
    seedsArr = [];

  for (let i = 0; i < seeds.length - 1; i = i + 2) {
    const start = seeds[i];
    const end = seeds[i] + seeds[i + 1] - 1;
    seedsArr.push([start, end]);
  }

  for (let i = 1; i < arr.length; i++) {
    const seedMap = sourceMap(arr[i]);
    let newSeedArr = [];

    for (let j = 0; j < seedsArr.length; j++) {
      const resultArr = mapSeedToDest02(
        seedsArr[j],
        seedMap.source,
        seedMap.dest
      );
      newSeedArr.push(...resultArr);
    }
    seedsArr = newSeedArr;
  }

  seedsArr.sort((a, b) => a[0] - b[0]);

  return seedsArr[0][0];
};

console.log(seedFertilizer02(arr));
