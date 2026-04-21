'use strict'

//object destructuring


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
    }
};

// restaurant.orderDelivery({
//     time: '22:30',
//     address: 'london center 21',
//     mainIndex: 2,
//     starterIndex: 2,
// });



//use same variable names, order doesnt matter

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//using other name and not property name
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;


//default values
// default value of the starters will not be applied - there is property starterMenu
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//mutating vars
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

//override the two initial values
({a,b} = obj) 
console.log(a, b);  //23 7

//nested object
const { fri: { open: o, close: c } } = openingHours;
console.log(o,c); //11 23
