function ruleEvaluation(rule, ratingsValues) {
  // Use regular expression to extract the number at the end
  const numberFromRule = Number(rule.match(/\d+$/)[0]);
  if (rule.includes("<")) {
    return ratingsValues[rule[0]] < numberFromRule;
  } else if (rule.includes(">")) {
    return ratingsValues[rule[0]] > numberFromRule;
  }
}

function workflow(objKey, ratingsValues) {
  // console.log('objKey',objKey);
  if (objKey === "A") {
    return 1;
  } else if (objKey === "R") {
    return 0;
  }

  const objValue = obj[objKey];
  const arr = Object.keys(obj[objKey]);

  let i;
  for (i = 0; i < arr.length; i++) {
    let rule = arr[i];
    if (rule.includes("<") || rule.includes(">")) {
      if (ruleEvaluation(rule, ratingsValues)) {
        return workflow(objValue[rule], ratingsValues);
      }
    } else if (rule === "last") {
      if (objValue["last"] === "R") {
        return 0;
      } else if (objValue["last"] === "A") {
        return 1;
      } else {
        return workflow(objValue["last"], ratingsValues);
      }
    }
  }
}

function aplenty01(arr) {
  let i,
    sum = 0;
  for (i = 0; i < arr.length; i++) {
    if (workflow("in", arr[i])) {
      sum += arr[i].x + arr[i].m + arr[i].a + arr[i].s;
    }
  }
  return sum;
}

// aplenty01(arr);

// Part 02

const obj = {
  px: { "a<2006": "qkq", "m>2090": "A", last: "rfg" },
  pv: { "a>1716": "R", last: "A" },
  lnx: { "m>1548": "A", last: "A" },
  rfg: { "s<537": "gd", "x>2440": "R", last: "A" },
  qs: { "s>3448": "A", last: "lnx" },
  qkq: { "x<1416": "A", last: "crn" },
  crn: { "x>2662": "A", last: "R" },
  in: { "s<1351": "px", last: "qqz" },
  qqz: { "s>2770": "qs", "m<1801": "hdj", last: "R" },
  gd: { "a>3333": "R", last: "R" },
  hdj: { "m>838": "A", last: "pv" },
};

const ratingsValues = {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000],
};

let solutionsArr = [];

function ruleEvaluation02(rule, ratingsValues) {
  // Use regular expression to extract the number at the end
  const numberFromRule = Number(rule.match(/\d+$/)[0]);
  if (rule.includes("<")) {
    if (ratingsValues[rule[0][1]] < numberFromRule) {
      return 1;
    } else {
      const newRatingsValuesTrue = {
        ...ratingsValues,
        [rule[0]]: [ratingsValues[rule[0]][0], numberFromRule - 1],
      };
      const newRatingsValuesFalse = {
        ...ratingsValues,
        [rule[0]]: [numberFromRule, ratingsValues[rule[0]][1]],
      };
      return [newRatingsValuesTrue, newRatingsValuesFalse];
    }
  } else if (rule.includes(">")) {
    if (ratingsValues[rule[0][0]] > numberFromRule) {
      return 1;
    } else {
      const newRatingsValuesTrue = {
        ...ratingsValues,
        [rule[0]]: [numberFromRule + 1, ratingsValues[rule[0]][1]],
      };
      const newRatingsValuesFalse = {
        ...ratingsValues,
        [rule[0]]: [ratingsValues[rule[0]][0], numberFromRule],
      };
      return [newRatingsValuesTrue, newRatingsValuesFalse];
    }
  }
}

function workflow02(objKey, ratingsValues) {
  let currentRatingsValues = ratingsValues;
  if (objKey === "A") {
    solutionsArr.push(currentRatingsValues);
    return 1;
  } else if (objKey === "R") {
    return 0;
  }

  const objValue = obj[objKey];
  const arr = Object.keys(obj[objKey]);

  let i;
  for (i = 0; i < arr.length; i++) {
    let rule = arr[i];
    if (rule.includes("<") || rule.includes(">")) {
      const evaluate = ruleEvaluation02(rule, currentRatingsValues);
      if (evaluate === 1) {
        return workflow02(objValue[rule], currentRatingsValues);
      } else {
        workflow02(objValue[rule], evaluate[0]);
        currentRatingsValues = evaluate[1];
      }
    } else if (rule === "last") {
      if (objValue["last"] === "R") {
        return 0;
      } else if (objValue["last"] === "A") {
        solutionsArr.push(currentRatingsValues);
        return 1;
      } else {
        return workflow02(objValue["last"], currentRatingsValues);
      }
    }
  }
}

function aplenty() {
  workflow02("in", ratingsValues);
  let i,
    sum = 0;
  for (i = 0; i < solutionsArr.length; i++) {
    sum +=
      (solutionsArr[i]["x"][1] - solutionsArr[i]["x"][0] + 1) *
      (solutionsArr[i]["m"][1] - solutionsArr[i]["m"][0] + 1) *
      (solutionsArr[i]["a"][1] - solutionsArr[i]["a"][0] + 1) *
      (solutionsArr[i]["s"][1] - solutionsArr[i]["s"][0] + 1);
  }
  return sum;
}

aplenty();
