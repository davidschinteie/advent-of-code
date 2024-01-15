const adventOfCode02 = (gamesInput) => {
  const bagConfig = {red: 12, green: 13, blue: 14};
  
  const checkCubes = (cubeInput) => {
    const cubeArr = cubeInput.split(' ');

    return bagConfig[cubeArr[1]] < Number(cubeArr[0]);
  }
  
  let returnSumIds = 0;
  for(let i = 0; i < gamesInput.length; i++){
   let flag = true;
   for(let j = 0; j < gamesInput[i].length; j++){
     for(let k = 0; k < gamesInput[i][j].length; k++){
       if(checkCubes(gamesInput[i][j][k])){
         flag = false;
         break;
       }
     }
     if(!flag){
       break;
     }
   } 
   if(flag){
     returnSumIds += (i+1); 
   }
  }
  
  return returnSumIds;
}

adventOfCode02([
  [["3 blue", "4 red"], ["1 red", "2 green", "6 blue"], ["2 green"]],
  [
    ["1 blue", "2 green"],
    ["3 green", "4 blue", "1 red"],
    ["1 green", "1 blue"],
  ],
  [
    ["8 green", "6 blue", "20 red"],
    ["5 blue", "4 red", "13 green"],
    ["5 green", "1 red"],
  ],
  [
    ["1 green", "3 red", "6 blue"],
    ["3 green", "6 red"],
    ["3 green", "15 blue", "14 red"],
  ],
  [
    ["6 red", "1 blue", "3 green"],
    ["2 blue", "1 red", "2 green"],
  ],
])

const adventOfCode02_02 = (gamesInput) => {
  const findMinBagConfig = (cubeInput, bagConfig) => {
    let newBagConfig = bagConfig;
    
    const cubeArr = cubeInput.split(' ');

    if(bagConfig[cubeArr[1]] < Number(cubeArr[0])){
      newBagConfig[cubeArr[1]] = Number(cubeArr[0]);
    }
    
    return newBagConfig;
  }
  
  const computeSetPower = (bagConfig) => {
    let setPower = 1;
    Object.keys(bagConfig).forEach(el => {
      setPower = setPower * bagConfig[el]
    });
    
    return setPower;
  }
  
  let returnSum = 0;
  
  for(let i = 0; i < gamesInput.length; i++){
   let bagConfig = {red: 0, green: 0, blue: 0};
   for(let j = 0; j < gamesInput[i].length; j++){
     for(let k = 0; k < gamesInput[i][j].length; k++){
       bagConfig = findMinBagConfig(gamesInput[i][j][k], bagConfig);
     }
   }
   const setPower = computeSetPower(bagConfig);
   returnSum += setPower; 
  }
  
  return returnSum;
}

adventOfCode02_02([
  [["3 blue", "4 red"], ["1 red", "2 green", "6 blue"], ["2 green"]],
  [
    ["1 blue", "2 green"],
    ["3 green", "4 blue", "1 red"],
    ["1 green", "1 blue"],
  ],
  [
    ["8 green", "6 blue", "20 red"],
    ["5 blue", "4 red", "13 green"],
    ["5 green", "1 red"],
  ],
  [
    ["1 green", "3 red", "6 blue"],
    ["3 green", "6 red"],
    ["3 green", "15 blue", "14 red"],
  ],
  [
    ["6 red", "1 blue", "3 green"],
    ["2 blue", "1 red", "2 green"],
  ],
])
