// Part 01

const str = "LLR";

const obj = {
  AAA: ["BBB", "BBB"],
  BBB: ["AAA", "ZZZ"],
  ZZZ: ["ZZZ", "ZZZ"],
};

let step = 0;

const nextStep = (key) => {
  const next = str[step] === "L" ? obj[key][0] : obj[key][1];
  if (step === str.length - 1) {
    step = 0;
  } else {
    step++;
  }
  return next;
};

const hauntedWasteland = () => {
  let increment = 0,
    nextNode = "AAA";
  while (nextNode !== "ZZZ") {
    nextNode = nextStep(nextNode);
    increment++;
  }
  console.log(increment);
};

hauntedWasteland();

// Part 02

const str02 = "LR";

const obj02 = {
  "11A": ["11B", "XXX"],
  "11B": ["XXX", "11Z"],
  "11Z": ["11B", "XXX"],
  "22A": ["22B", "XXX"],
  "22B": ["22C", "22C"],
  "22C": ["22Z", "22Z"],
  "22Z": ["22B", "22B"],
  XXX: ["XXX", "XXX"],
};

const allEqual = (arr) => arr.every((v) => v === arr[0]);

const nextStep02 = (key, navigationStep) => {
  const next =
    str02[navigationStep % str02.length] === "L"
      ? obj02[key][0]
      : obj02[key][1];
  return next;
};

const navigateNext = (startNode) => {
  let increment = 0,
    nextNode = startNode;

  while (!nextNode.endsWith("Z")) {
    nextNode = nextStep02(nextNode, increment);
    increment++;
  }

  return increment;
};

// LCM using Euclidean Algorithm

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

const lcmArr = (arr) => arr.reduce(lcm);

const hauntedWasteland02 = () => {
  let i;
  const keysArr = Object.keys(obj02).filter((el) => el.endsWith("A"));
  let solutionsArr = new Array(keysArr.length).fill(0);

  for (i = 0; i < keysArr.length; i++) {
    const startNode = keysArr[i];
    solutionsArr[i] = navigateNext(startNode);
  }

  console.log(lcmArr(solutionsArr));
};

hauntedWasteland02();
