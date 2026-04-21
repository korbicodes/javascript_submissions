'use strict'

//sets (iterables) - takes an iterable as input - collection of unique values - cannot have duplicates / can contain mixed data types | the order is irrelevant

const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet);  //pasta pizza risotto


console.log(new Set('jonas')); //set(5)  {'j',o,..}

console.log(ordersSet.size); //3


console.log(ordersSet.has('Pizza'));//true --similar to includes method in arrays

ordersSet.add('garlic bread')

ordersSet.delete('Pizaa')


//delete all elements
// ordersSet.clear()


//looping
for(const order of ordersSet) console.log(order);


// normal use of sets is to improve duplicate values of arrays
const staff = ['waiter','chef', 'waiter', 'manager', 'chef', 'waiter']
const unique = new Set(staff)
console.log(unique);



//spread operator works in all iterables hence can create an array out of a set
const staffUni = [...new Set(staff)];


//counting how many different letters are in a string
console.log(new Set('jonassss').size); //5


//new operations to make sets useful, 7 more methods were aded in es2025

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);


//which ing are present in italian and mecan foods
//interesection method
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log([...commonFoods]);

//union mehthods: all elements of sets without duplicates
const itcan = italianFoods.union(mexicanFoods);
console.log('union: ', itcan);

console.log([...new Set([...italianFoods, ...mexicanFoods])]);


//difference method: new set that contains all elements present in the first set but not in the second one.

const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Difference italian: ' , uniqueItalianFoods);

//symmetric - opposite of intersection (unique italian and can foods but not the common ones)

const italianAndCanFoods = italianFoods.symmetricDifference(mexicanFoods)
console.log(italianAndCanFoods);

//check if one set contains another set
console.log(italianFoods.isDisjointFrom(mexicanFoods)); //checks if the sets are completely different , basically if one set contain any elements of the other set.