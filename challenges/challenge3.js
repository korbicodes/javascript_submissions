'use strict';
//Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// const calcAverageHumanAge = function (ages) {
//     const humanAges = ages.map(age => age <= 2 ? age * 2 : 16 + age * 4);
//     console.log(humanAges)
//     const dogs = humanAges.filter(age => age > 18)
//     const average = dogs.reduce(function (acc, age) {
//         return acc + age;
//     }, 0) / dogs.length;

//     return average;
// };


const calcAverageHumanAge =  ages => {
return ages.map(age => age <= 2 ? age * 2 : 16 + age * 4).filter(age => age > 18).reduce((acc, age,i,arr) => acc + age / arr.length, 0);
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 =calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1,avg2)