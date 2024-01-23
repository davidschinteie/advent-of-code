// Part 01

function findIntersection(arrA, arrB) {
  const Xa = BigInt(arrA[0][0]);
  const Ya = BigInt(arrA[0][1]);
  const Vxa = BigInt(arrA[1][0]);
  const Vya = BigInt(arrA[1][1]);
  const Xb = BigInt(arrB[0][0]);
  const Yb = BigInt(arrB[0][1]);
  const Vxb = BigInt(arrB[1][0]);
  const Vyb = BigInt(arrB[1][1]);

  const timeA =
    Vyb * Vxa - Vxb * Vya !== 0n
      ? (Vyb * (Xb - Xa) - Vxb * (Yb - Ya)) / (Vyb * Vxa - Vxb * Vya)
      : Infinity;
  const timeB =
    Vxb * Vya - Vyb * Vxa !== 0n
      ? (-1n * Vya * (Xb - Xa) + Vxa * (Yb - Ya)) / (Vxb * Vya - Vyb * Vxa)
      : Infinity;

  if (timeA < 0 || timeB < 0 || timeA === Infinity || timeB === Infinity) {
    return 0;
  }

  const Sax = Xa + Vxa * timeA;
  const Say = Ya + Vya * timeA;

  return (
    Sax >= 200000000000000 &&
    Sax <= 400000000000000 &&
    Say >= 200000000000000 &&
    Say <= 400000000000000
  );
}

function neverTellMeTheOdds(arr) {
  let i,
    j,
    increment = 0;
  for (i = 0; i < arr.length - 1; i++) {
    for (j = i + 1; j < arr.length; j++) {
      if (findIntersection(arr[i], arr[j])) {
        increment++;
      }
    }
  }

  console.log(increment);
}

neverTellMeTheOdds(arr);

// Part 02

function det(arr) {
  if (arr.length === 2) {
    return (
      BigInt(arr[0][0]) * BigInt(arr[1][1]) -
      BigInt(arr[0][1]) * BigInt(arr[1][0])
    );
  } else if (arr.length === 1) {
    return BigInt(arr[0][0]);
  } else if (arr.length > 2) {
    let i,
      j,
      detSection = 0n;
    for (i = 0; i < arr.length; i++) {
      let sectionArr = arr.map((rowArr) => rowArr.slice());
      sectionArr.splice(0, 1);
      sectionArr.map((row) => row.splice(i, 1));
      detSection +=
        BigInt((-1) ** i) * BigInt(arr[0][i]) * BigInt(det(sectionArr));
    }
    return detSection;
  } else {
    return 0;
  }
}

function cramer(arr01, arr02) {
  const detA = BigInt(det(arr01));
  let i,
    solutionArr = [];
  for (i = 0; i < arr01.length; i++) {
    let arrI = arr01.map((rowArr) => rowArr.slice());
    for (let j = 0; j < arr02.length; j++) {
      arrI[j][i] = arr02[j];
    }
    const detI = BigInt(det(arrI));
    const solutionI = BigInt(detI / detA);
    solutionArr.push(solutionI);
  }
  return solutionArr;
}

function neverTellMeTheOdds2(arr) {
  const px0 = BigInt(arr[0][0][0]),
    py0 = BigInt(arr[0][0][1]),
    pz0 = BigInt(arr[0][0][2]),
    vx0 = BigInt(arr[0][1][0]),
    vy0 = BigInt(arr[0][1][1]),
    vz0 = BigInt(arr[0][1][2]);
  let i,
    j,
    cramerArr1 = [],
    cramerArr2 = [],
    sum = 0n;
  for (i = 1; i <= 3; i++) {
    const pxi = BigInt(arr[i][0][0]),
      pyi = BigInt(arr[i][0][1]),
      pzi = BigInt(arr[i][0][2]),
      vxi = BigInt(arr[i][1][0]),
      vyi = BigInt(arr[i][1][1]),
      vzi = BigInt(arr[i][1][2]);
    cramerArr1.push(
      [vy0 - vyi, vxi - vx0, 0n, pyi - py0, px0 - pxi, 0n],
      [vz0 - vzi, 0n, vxi - vx0, pzi - pz0, 0n, px0 - pxi]
    );
    cramerArr2.push(
      px0 * vy0 - py0 * vx0 - pxi * vyi + pyi * vxi,
      px0 * vz0 - pz0 * vx0 - pxi * vzi + pzi * vxi
    );
  }

  const solutionsArr = cramer(cramerArr1, cramerArr2);

  for (j = 0; j < 3; j++) {
    sum += BigInt(solutionsArr[j]);
  }

  return sum;
}

neverTellMeTheOdds2(arr);
