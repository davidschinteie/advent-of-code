const cardsMap = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

// Part 2
const cardsMap2 = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const arr = [
  ["32T3K", 765],
  ["T55J5", 684],
  ["KK677", 28],
  ["KTJJT", 220],
  ["QQQJA", 483],
];

const getStrength = (hand) => {
  let i;
  let handMap = new Array(cardsMap.length).fill(0);
  for (i = 0; i < hand.length; i++) {
    handMap[cardsMap.indexOf(hand[i])]++;
  }

  const maxValue = Math.max(...handMap);
  if (maxValue === 5) {
    return 6;
  }
  if (maxValue === 4) {
    return 5;
  }
  if (maxValue === 3) {
    if (handMap.find((el) => el === 2)) {
      return 4;
    } else {
      return 3;
    }
  }
  if (maxValue === 2) {
    if (handMap.filter((el) => el === 2).length === 2) {
      return 2;
    } else {
      return 1;
    }
  }
  return 0;
};

// Part 2
const getStrength2 = (hand) => {
  let i;
  let handMap = new Array(cardsMap2.length).fill(0);
  for (i = 0; i < hand.length; i++) {
    handMap[cardsMap2.indexOf(hand[i])]++;
  }

  // slice array not to contain joker cards for maximum value
  const noOfJokers = handMap[handMap.length - 1];
  const slicedHandMap = handMap.slice(0, handMap.length - 1);
  const maxValue = Math.max(...slicedHandMap);

  // rewrite the maximum value in the array with 0
  const maxIndex = slicedHandMap.indexOf(maxValue);
  slicedHandMap[maxIndex] = 0;

  if (maxValue === 5 || maxValue + noOfJokers === 5) {
    return 6;
  }
  if (maxValue === 4 || maxValue + noOfJokers === 4) {
    return 5;
  }
  if (maxValue === 3 || maxValue + noOfJokers === 3) {
    if (slicedHandMap.find((el) => el === 2)) {
      return 4;
    } else {
      return 3;
    }
  }
  if (maxValue === 2 || maxValue + noOfJokers === 2) {
    if (slicedHandMap.filter((el) => el === 2).length === 1) {
      return 2;
    } else {
      return 1;
    }
  }
  return 0;
};

const sortHands = (a, b) => {
  const handA = a[0];
  const handB = b[0];
  if (getStrength(handA) !== getStrength(handB)) {
    return getStrength(handA) - getStrength(handB);
  } else {
    let i;
    for (i = 0; i < 5; i++) {
      if (handA[i] !== handB[i]) {
        const indexA = cardsMap.indexOf(handA[i]);
        const indexB = cardsMap.indexOf(handB[i]);
        return indexB - indexA;
      }
    }
  }
};

const camelCards = (arr) => {
  let i,
    sum = 0;
  const sortedArr = arr.sort(sortHands);
  for (i = 0; i < sortedArr.length; i++) {
    sum += arr[i][1] * (i + 1);
  }
  return sum;
};

camelCards(arr);
