const adventOfCode03_01 = (puzzleInput) => {
  let sum = 0;
  // special charaters to test if are adjacent to a number (periods do not count as a symbol)
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  // function to search for adjacent symbols for a given row index, a min and a max column index
  const checkAdjacent = (rowNumber, minCol, maxCol) => {
    // adjust the first and last index of the search for symbol to look for adiacent symbol
    const minX = minCol === 0 ? 0 : minCol - 1;
    const maxX = maxCol;
    const minY = rowNumber === 0 ? 0 : rowNumber - 1;
    const maxY =
      rowNumber === puzzleInput.length - 1
        ? puzzleInput.length - 1
        : rowNumber + 1;

    for (let i = minY; i <= maxY; i++) {
      for (let j = minX; j <= maxX; j++) {
        // if only onw symbol was found return true, there is no need to keep searching
        if (specialChars.test(puzzleInput[i][j])) {
          return true;
        }
      }
    }

    // returning false means no adjacent symbol was found
    return false;
  };

  // iterate through the puzzle input for every string input
  for (let i = 0; i < puzzleInput.length; i++) {
    let number = "";
    let minX = 0;

    for (let j = 0; j < puzzleInput[i].length; j++) {
      if (!isNaN(Number(puzzleInput[i][j]))) {
        // save the first index of the first digit found
        if (number === "") {
          minX = j;
        }
        // save the number so it can be added up to the sum if symbols are found
        number += puzzleInput[i][j];

        if (j === puzzleInput[i].length - 1) {
          const maxX = j;
          if (checkAdjacent(i, minX, maxX)) {
            sum += Number(number);
          }
          // clean the number after the search was done
          number = "";
        }
      } else if (number !== "") {
        // if the number is !== '' than the number sequence is ended and the search for an adjacent symbol should be done

        // save the maximum column index
        const maxX = j;
        if (checkAdjacent(i, minX, maxX)) {
          sum += Number(number);
        }
        // clean the number after the search was done
        number = "";
      }
    }
  }

  return sum;
};

adventOfCode03_01([
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
]);

const adventOfCode03_02 = (puzzleInput) => {
  let sum = 0;
  // special charater to test if is adjacent to given position from the puzzle input
  const specialChar = "*";

  // function to search for adjacent symbol for a given row index and a column index
  const checkAdjacentNumbers = (rowNumber, colNumber) => {
    let number = "";
    let firstNumber = null;
    // adjust the first and last index of the search to look for adiacent numbers
    const minX = Math.min(colNumber, colNumber - 1);
    const maxX =
      colNumber === puzzleInput[rowNumber].length - 1
        ? colNumber
        : colNumber + 1;
    const minY = Math.min(rowNumber, rowNumber - 1);
    const maxY =
      rowNumber === puzzleInput.length - 1 ? rowNumber : rowNumber + 1;

    for (let i = minY; i <= maxY; i++) {
      for (let j = minX; j <= maxX; j++) {
        if (!isNaN(Number(puzzleInput[i][j]))) {
          let k = j;
          while (!isNaN(Number(puzzleInput[i][k]))) {
            number += puzzleInput[i][k];
            if (k === 0) {
              break;
            }
            k--;
          }
          let newNumber = number.split("").reverse().join("");
          let l = j + 1;
          while (!isNaN(Number(puzzleInput[i][l]))) {
            newNumber += puzzleInput[i][l];
            if (l === puzzleInput[i][l].length - 1) {
              break;
            }
            l++;
          }
          j = l;
          if (firstNumber === null) {
            firstNumber = Number(newNumber);
          } else {
            sum += firstNumber * Number(newNumber);
            firstNumber = null;
          }
          newNumber = "";
          number = "";
        }
      }
    }

    // returning false means no adjacent symbol was found
    return false;
  };

  // iterate through the puzzle input for every string input
  for (let i = 0; i < puzzleInput.length; i++) {
    for (let j = 0; j < puzzleInput[i].length; j++) {
      // check if the instance from the string is the special symbol
      if (specialChar === puzzleInput[i][j]) {
        checkAdjacentNumbers(i, j);
      }
    }
  }

  return sum;
};

adventOfCode03_02([
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
]);
