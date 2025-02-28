[
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
  [0, 2, 3, 5, 10, 14, 17, 20, 21, 22, 24, 27, 29],
];

"formatArray"[
  ([2, 4, 1, 3, 4, 3, 2, 3, 1, 1, 3, 2, 3],
  [3, 2, 1, 5, 4, 5, 3, 5, 3, 5, 6, 2, 3],
  [3, 2, 5, 5, 2, 4, 5, 6, 5, 4, 2, 5, 4],
  [3, 4, 4, 6, 5, 8, 5, 8, 4, 5, 4, 5, 2],
  [4, 5, 4, 6, 6, 5, 7, 8, 6, 7, 5, 3, 6],
  [1, 4, 3, 8, 5, 9, 8, 7, 9, 8, 4, 5, 4],
  [4, 4, 5, 7, 8, 7, 6, 9, 8, 7, 7, 6, 6],
  [3, 6, 3, 7, 8, 7, 7, 9, 7, 9, 6, 5, 3],
  [4, 6, 5, 4, 9, 6, 7, 9, 8, 6, 8, 8, 7],
  [4, 5, 6, 4, 6, 7, 9, 9, 8, 6, 4, 5, 3],
  [1, 2, 2, 4, 6, 8, 6, 8, 6, 5, 5, 6, 3],
  [2, 5, 4, 6, 5, 4, 8, 8, 8, 7, 7, 3, 5],
  [4, 3, 2, 2, 6, 7, 4, 6, 5, 5, 5, 3, 3])
];

const directions = {
  l2r: [
    { row: 1, col: 0 },
    { row: 0, col: 1 },
    { row: -1, col: 0 },
    { row: 0, col: -1 },
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
    { row: 1, col: 0 },
    { row: 0, col: 1 },
    { row: -1, col: 0 },
    { row: 0, col: -1 },
  ],
};
