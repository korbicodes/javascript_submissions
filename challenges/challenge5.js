// 'use strict'
// Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

// - Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// - Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// - Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// tasks:
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
// dogs.forEach(({ weight }, i) => {
//     dogs[i].recommended = Math.floor(weight ** 0.75 * 28);
// })

dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose)

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(`Sarah's dog eats too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'} `)




// 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
const ownersTooMuch = dogs.filter(dog=>dog.curFood>dog.recFood).flatMap(dog=>dog.owners)
const ownersTooLittle = dogs.filter(dog=>dog.curFood < dog.recFood).flatMap(dog=>dog.owners)



// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersTooMuch.join(' and ')}'s dogs are eating too much`)
console.log(`${ownersTooLittle.join(' and ')}'s dogs are eating too little`);

// 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recFood))
// 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
const checkEatingOkay = dog => dog.curFood * 1.1 && dog.curFood > dog.recFood * 0.9
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsEatingOkay = dogs.filter(checkEatingOkay)
console.log(dogsEatingOkay)
// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
  if (dog.curFood > deg.recFood) {
    return 'too-much'
  } else if (dog.curFood < dog.recFood) {
    return 'too-little'
  } else {
    return 'exact'
  }
})
console.log(dogsGroupedByPortion)
// 9. Group the dogs by the number of owners they have
const dogsGroupedByOwners = Object.groupBy(dogs, dog => `${dog.owners.length}-owners`)
console.log(dogsGroupedByOwners)

// 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
const dogsSorted = dogs.toSorted((a,b)=> a.recFood - b.recFood)
console.log(dogsSorted)




