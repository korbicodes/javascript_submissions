'use strict'
//looping objects: keys,values and entries

const weekdays = ['thu', 'fri', 'sat' ]

const openingHours = {
        [weekdays[0]]: {
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
        
};


const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    },

    openingHours,

    orderDelivery: function ({ starterIndex=1, mainIndex=0, time='22:00', address }) {
        console.log(`${this.starterMenu[starterIndex]} and ${this.starterMenu[mainIndex]} will be delivered to ${address} at ${time}`)
    },
    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1},  ${ing2} and  ${ing3}`)
    }

};

//property names
const properties = Object.keys(openingHours)
console.log(properties);

let openStr = `we are open on ${properties.length} days: `
for (const day of properties) {
    openStr += `${day},`
}
console.log(openStr);


//property values
const values = Object.values(openingHours)
console.log(values);



//entire object
const entries = Object.entries(openingHours)
console.log(entries);


for (const [key, { open, close }] of entries) {
    console.log(`On ${key} we open at ${open} and close at ${close}`);
}

