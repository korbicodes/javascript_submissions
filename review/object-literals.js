//enhanced object literals
'use strict'

// object destructuring
//in es6 no longer have to write a property and then set it to a function expression
//can compute property names instead of writing them manually and literally

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
    // order: function (starterIndex, mainIndex) {
    //     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    // },

    //new way - after es6
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    },

    // before es6
    // openingHours: openingHours,


    //es6 enhanced object literals
    openingHours,

    orderDelivery: function ({ starterIndex=1, mainIndex=0, time='22:00', address }) {
        console.log(`${this.starterMenu[starterIndex]} and ${this.starterMenu[mainIndex]} will be delivered to ${address} at ${time}`)
    },
    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1},  ${ing2} and  ${ing3}`)
    }

};




