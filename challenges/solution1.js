// Find the number with the most digits.

// If two numbers in the argument array have the same number of digits, return the first one in the array.

function findLongest(array) {
  if (array.length === 0) return null; 

  let max = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i].toString().length > max.toString().length) {
      max = array[i];
    }
  }

  return max;
}