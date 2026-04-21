//destructuring arrays

'use strict'

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    }
};


const [first, second] = restaurant.categories;
console.log(first, second);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//nested destructuring
const nested = [2, 4, [5, 6]];
const [element1, , element3] = nested;
console.log(element1, element3); // 2,[5,6]


//getting all elements
const [i, j, [e, d]] = nested;
console.log(i, j, e, d);


//set default values
const [p,q,r] = [8,9]
console.log(p, q, r);  //8 9 undefined


const [u = 1, v = 1, z = 1] = [8, 9];
console.log(u, v, z); //8,9,1