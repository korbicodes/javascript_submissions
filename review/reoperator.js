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


//spread operator
const arr = [1, 2, ...[3, 4]];
//rest param
const [a, b, ...others] = [1, 2, 3, 4, 5];

const [pizza,,risotto, ...otherFood] = [...restaurant.mainMenu, restaurant.starterMenu];
console.log(pizza, risotto, otherFood);

//objects
const { sat, ...otherDays } = restaurant.openingHours;
console.log(sat, otherDays);

//functions

const add = function (...numbers) {
    let sum = 0;
    for (leti = 0; i < numbers.length; i++){
        sum+= numbers[i]
    }
    console.log(sum);
};

add(2,3)
add(2,3,4,5)

const list = [23,5,7,9]
add(...list)