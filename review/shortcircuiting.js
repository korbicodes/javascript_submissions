'use strict'

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, //open 24 hours
            close: 24,
        },
        
    },
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    },
    orderDelivery: function ({ starterIndex=1, mainIndex=0, time='22:00', address }) {
        console.log(`${this.starterMenu[starterIndex]} and ${this.starterMenu[mainIndex]} will be delivered to ${address} at ${time}`)
    },
    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1},  ${ing2} and  ${ing3}`)
    }

};




//logical operators //can return any data type, short-circuiting (in case of OR operator: if the first value is a truthy values, immediately returns that first value)

console.log(3 || 'jonas');  //3
console.log('' || 'jonas'); //jonas
console.log(true || 0); //true
console.log(undefined || null); //null


console.log(undefined || 0 || '' || 'hello' || 23 || null); //hello
//hello is the first truthy value


// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);
//not good solution if first value is 0 as it is a falsy value and it will be ignored



//and -  shorts circuits when first value is falsy

console.log(0 && 'jonas'); //0
// when values are truthy, eval continues and last value is returned. so its true only if all operands are true
console.log(7 && 'jonas'); //jonas

console.log('hello' && 23 && null && 'jonas'); //null - first value that is false

//practical eg
if (restaurant.orderPasta) {
    restaurant.orderPasta('mushrooms', 'spinach', 'sauce')
}

restaurant.orderPasta && restaurant.orderPasta('mushrooms', 'spinach','sauce');