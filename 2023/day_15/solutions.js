// part 01
function lensLibrary(str) {
  const arr = str.split(",");
  let i,
    j,
    sum = 0;

  for (i = 0; i < arr.length; i++) {
    const newArr = arr[i].split("");
    let currentValue = 0;
    for (j = 0; j < newArr.length; j++) {
      currentValue += newArr[j].charCodeAt();
      currentValue *= 17;
      currentValue = currentValue % 256;
    }
    sum += currentValue;
  }

  console.log(sum);
}

// part 02
function hash(str) {
  let i,
    currentValue = 0;
  for (i = 0; i < str.length; i++) {
    currentValue += str[i].charCodeAt();
    currentValue *= 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
}

function extractSubstring(inputString) {
  const equalsIndex = inputString.indexOf("=");
  const hyphenIndex = inputString.indexOf("-");
  // Find the minimum index that is not -1
  const endIndex = Math.min(
    equalsIndex !== -1 ? equalsIndex : Infinity,
    hyphenIndex !== -1 ? hyphenIndex : Infinity
  );

  if (endIndex !== -1) {
    return inputString.substring(0, endIndex);
  } else {
    // If neither character is found, return the entire string
    return inputString;
  }
}

function extractFocalLength(inputString) {
  const equalsIndex = inputString.indexOf("=");

  if (equalsIndex !== -1) {
    return inputString.substring(equalsIndex + 1);
  } else {
    // If '=' is not found, return the entire string
    return inputString;
  }
}

function findLabel(arr, label) {
  let i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i][0] === label) {
      return i;
    }
  }
  return false;
}

function lensLibrary2(str) {
  const arr = str.split(",");
  let i,
    j,
    sum = 0,
    lensesBoxes = Array.from({ length: 256 }, () => []);

  for (i = 0; i < arr.length; i++) {
    const label = extractSubstring(arr[i]);
    const boxIndex = hash(label);
    if (arr[i].includes("=")) {
      const focalLength = Number(extractFocalLength(arr[i]));
      const existingLabelIndex = findLabel(lensesBoxes[boxIndex], label);
      if (existingLabelIndex !== false) {
        lensesBoxes[boxIndex][existingLabelIndex][1] = focalLength;
      } else {
        lensesBoxes[boxIndex].push([label, focalLength]);
      }
    } else if (arr[i].includes("-")) {
      const existingLabelIndex = findLabel(lensesBoxes[boxIndex], label);
      if (existingLabelIndex !== false) {
        lensesBoxes[boxIndex].splice(existingLabelIndex, 1);
      }
    }
  }

  for (i = 0; i < lensesBoxes.length; i++) {
    if (lensesBoxes[i].length > 0) {
      lensesBoxes[i].forEach((el, index) => {
        sum += (i + 1) * (index + 1) * el[1];
      });
    }
  }

  console.log(sum);
}
