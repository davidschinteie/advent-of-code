const adventOfCode01 = (calibrationDocument) => {
  const digitsMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
  };
  const digitsKeys = Object.keys(digitsMap);

  const wordToNumber = (word) => {
    const lowerCaseWord = word.toLowerCase();
    const foundDigitFromLetters = digitsKeys.findLast((key) =>
      lowerCaseWord.includes(key)
    );
    return foundDigitFromLetters ? digitsMap[foundDigitFromLetters] : word;
  };

  const extractNumber = (input) => {
    let word = "";
    const digitArray = [];

    input
      .split("")
      .map((char) => {
        if (/\d/.test(char)) {
          digitArray.push(Number(char));
          word = "";
        } else {
          word += char;
          const digitFromWord = wordToNumber(word);
          if (!isNaN(digitFromWord)) {
            digitArray.push(digitFromWord);
            word = word[word.length - 1];
          }
        }
      })
      .filter(Number.isFinite);

    if (digitArray) {
      const firstDigit = Number(digitArray[0]);
      const secondDigit = Number(digitArray[digitArray.length - 1]);

      const number = firstDigit * 10 + secondDigit;
      return number;
    }

    return null;
  };

  let returnSum = 0;
  for (let i = 0; i < calibrationDocument.length; i++) {
    const number = extractNumber(calibrationDocument[i]);
    returnSum += number;
  }

  return returnSum;
};

adventOfCode01([
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
]);
