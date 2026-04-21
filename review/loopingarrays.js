'use strict'
//looping arrays - the for of loop
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


// can use break and continue
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//can get element and index also
//for (const item of menu) console.log(item)

// for (const item of menu.entries()) {
//     // console.log(menu.entries());  //object [array iterator] {}
//     console.log(item);
//     console.log(`${item[0]+1}: ${item[1]}`);
// }

// for (const [i, el] of menu.entries()) {
//      console.log(`${i+1}:${el}`)
// }

console.log([...menu.entries()]);