// Iteration 1 | Find the Maximum
function maxOfTwoNumbers(num1, num2) {
  if (num1 > num2) {
    return num1;
  } else {
    return num2;
  }
}
console.log(maxOfTwoNumbers(5, 10));
console.log(maxOfTwoNumbers(2345, 2435));

// Iteration 2 | Find the Longest Word
const words = [
  "mystery",
  "brother",
  "aviator",
  "crocodile",
  "pearl",
  "orchard",
  "crackpot",
];

function findLongestWord(words) {
  let longestWord = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  return longestWord;
}
console.log(findLongestWord(words));
// solucion de jarko
function findLongestWord(words) {
    if (!words.length) 
      return null;
    
    let longest= words [0];

    for (let i=1; i< words.length; i++) 
      if (words[i].length > longest.length) 
        longest = words[i];
    return longest;
      }

// Iteration 3 | Sum Numbers
const numbers = [6, 12, 1, 18, 13, 16, 2, 1, 8, 10];

function sumNumbers(numbers) {
  
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
let totalSum = sumNumbers(numbers);
console.log(totalSum);

// solucion de jarko
function sumNumbersReduce(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

// Iteration 4 | Numbers Average
const numbers2 = [2, 6, 9, 10, 7, 4, 1, 9];

function averageNumbers(numbers) {
  if (numbers.length === 0) {
    return null;
  }

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  let promedio = sum / numbers.length;
  return promedio;
}

let average = averageNumbers(numbers2);
console.log(average);   

// * solucion de jarko
function averageNumbersReduce(numbers) {
  if (numbers.length === 0) {
    return null;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// solucion de jarko para arrays de strings
function averageNumbers(numbers) {
    if (!numbers.length)     return null;
    return sumNumbers(numbers) / numbers.length;
  }
// Iteration 5 | Find Elements
const words2 = [
  "machine",
  "subset",
  "trouble",
  "starting",
  "matter",
  "eating",
  "truth",
  "disobedience",
];

function doesWordExist(words, word) {
  
    for (let i = 0; i < words.length; i++) {
   
        if (words[i] === word) 
      return true;
  }     
  
  return false;
}

console.log(doesWordExist(words2, "machine"));
console.log(doesWordExist(words2, "banana")); 
