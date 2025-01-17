const arr = [
  "2413432311323",
  "3215453535623",
  "3255245654254",
  "3446585845452",
  "4546657867536",
  "1438598798454",
  "4457876987766",
  "3637877979653",
  "4654967986887",
  "4564679986453",
  "1224686865563",
  "2546548887735",
  "4322674655533",
];

// const calculateNextStep = (arr, i, j, straightIndex) => {
//   const minHeatLoss = Math.min(a,b,c);
// }

const clumsyCrucible = (arr) => {
  let i = 0,
    j = 0,
    directionArrow = "l2r";

  const formatArray = arr.map((str) => str.split("").map(Number));
  // console.log('formatArray',formatArray)

  const distance = new Array(arr.length).fill(
    new Array(arr[0].length).fill(Infinity)
  );
  let visited = new Array(arr.length).fill(
    new Array(arr[0].length).fill(false)
  );
  visited[0][0] = true;
  const rows = arr.length;
  const cols = arr[0].length;

  const directions = {
    l2r: [
      { row: 1, col: 0 },
      { row: 0, col: 1 },
      { row: -1, col: 0 },
    ],
    r2l: [
      { row: 1, col: 0 },
      { row: -1, col: 0 },
      { row: 0, col: -1 },
    ],
    t2b: [
      { row: 1, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: -1 },
    ],
    b2t: [
      { row: 0, col: 1 },
      { row: -1, col: 0 },
      { row: 0, col: -1 },
    ],
  };

  // console.log('directions',directions)

  // distance[0][0] = 0;

  // // for(let i = 0; i < rows; i++){
  // for(let i = 0; i < rows; i++){
  //   for(let j = 0; j < cols; j++){
  //   // for(let j = 0; j < cols; j++){

  //   }
  // }

  // return distance;

  while (i !== rows.length - 1 && j !== cols.length - 1) {
    const heatLosses = {};
    directions[directionArrow].forEach((direction) => {
      const newRow = i + direction.row;
      const newCol = j + direction.col;
      if (newRow < rows && newRow >= 0 && newCol < cols && newCol >= 0) {
        heatLosses[formatArray[newRow][newCol]] = {
          indexI: newRow,
          indexJ: newCol,
        };
      }
    });

    let minLosses = Object.keys(heatLosses).sort((a, b) => a - b);
    while (
      visited[heatLosses[minLosses[0]]["indexI"]][
        heatLosses[minLosses[0]]["indexJ"]
      ]
    ) {
      minLosses.shift();
    }

    const nextPosition = {
      indexI: heatLosses[minLosses[0]].indexI,
      indexJ: heatLosses[minLosses[0]].indexJ,
    };

    visited[nextPosition.indexI][nextPosition.indexJ] = true;

    // console.log(nextPosition);

    if (nextPosition.indexI > i) {
      directionArrow = "t2b";
    } else if (nextPosition.indexJ > j) {
      directionArrow = "l2r";
    } else if (nextPosition.indexI < i) {
      directionArrow = "b2t";
    } else if (nextPosition.indexJ < j) {
      directionArrow = "r2l";
    }

    i = nextPosition.indexI;
    j = nextPosition.indexJ;
  }
};

// clumsyCrucible(arr);

const clumsyCrucible02 = (arr) => {
  const formatArray = arr.map((str) => str.split("").map(Number));
  const rows = formatArray.length;
  const cols = formatArray[0].length;
  const distance = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(Infinity));
  const previous = new Array(rows)
    .fill(null)
    .map(() => new Array(arr[0].length).fill(null));
  const visited = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(false));
  // const currentVertex = { indexI: 0, indexJ: 0 };

  let directionArrow = "l2r",
    indexI = 0,
    indexJ = 0;

  const directions = {
    l2r: [
      { row: 1, col: 0 },
      { row: 0, col: 1 },
      { row: -1, col: 0 },
    ],
    r2l: [
      { row: 1, col: 0 },
      { row: -1, col: 0 },
      { row: 0, col: -1 },
    ],
    t2b: [
      { row: 1, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: -1 },
    ],
    b2t: [
      { row: 0, col: 1 },
      { row: -1, col: 0 },
      { row: 0, col: -1 },
    ],
  };

  distance[0][0] = 0;
  // visited[0][0] = true;

  // console.log("visited[rows][cols]", visited[1][1]);
  // console.log("rows", rows);
  // console.log("cols", cols);

  while (!visited[rows - 1][cols - 1]) {
    const currentVertex = {
      indexI,
      indexJ,
    };
    // visited[0][0] = true;
    // console.log("visited 1", visited);
    // console.log("currentVertex.indexI 1", currentVertex.indexI);
    // console.log("currentVertex.indexJ 1", currentVertex.indexJ);

    visited[currentVertex.indexI][currentVertex.indexJ] = true;
    // console.log("visited 2", visited);
    const neighbours = [];
    directions[directionArrow].forEach((el) => {
      const newRow = currentVertex.indexI + el.row;
      const newCol = currentVertex.indexJ + el.col;

      console.log("newRow", newRow);
      console.log("newCol", newCol);
      visited[newRow][newCol] &&
        console.log("visited[newRow][newCol]", visited[newRow][newCol]);

      if (
        newRow < rows &&
        newRow >= 0 &&
        newCol < cols &&
        newCol >= 0 &&
        !visited[newRow][newCol]
      ) {
        // console.log("newRow 2", newRow);
        // console.log("newCol 2", newCol);
        neighbours.push({
          indexI: newRow,
          indexJ: newCol,
          weight: formatArray[newRow][newCol],
        });

        if (
          distance[newRow][newCol] >
          distance[currentVertex.indexI][currentVertex.indexJ] +
            formatArray[newRow][newCol]
        ) {
          distance[newRow][newCol] =
            distance[currentVertex.indexI][currentVertex.indexJ] +
            formatArray[newRow][newCol];
        }
      }
    });

    let minDist = Infinity;
    console.log("neighbours", neighbours);
    neighbours.forEach((neighbour) => {
      if (neighbour.weight < minDist) {
        indexI = neighbour.indexI;
        indexJ = neighbour.indexJ;
        minDist = neighbour.weight;
      }
    });

    if (currentVertex.indexI < indexI && currentVertex.indexJ === indexJ) {
      directionArrow = "t2b";
    } else if (
      currentVertex.indexI === indexI &&
      currentVertex.indexJ < indexJ
    ) {
      directionArrow = "l2r";
    } else if (
      currentVertex.indexI > indexI &&
      currentVertex.indexJ === indexJ
    ) {
      directionArrow = "b2t";
    } else if (
      currentVertex.indexI === indexI &&
      currentVertex.indexJ > indexJ
    ) {
      directionArrow = "r2l";
    }

    console.log("indexI", indexI);
    console.log("indexJ", indexJ);
    console.log("directionArrow", directionArrow);
  }

  return distance;
};

console.log(clumsyCrucible02(arr));
