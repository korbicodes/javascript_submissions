'use strict'

//expand an array into all its elements

const arr =[7,8,9]
const newArr = [1,2,...arr]
console.log(newArr); //12789

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



const newMenu = [...restaurant.mainMenu,'gnocci']
console.log(newMenu);


//copy
const mainMenuCopy = [...restaurant.mainMenu];
//join arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];


// spread op works with all iterables (arrays,strings,maps,sets. NOT objects)

const str = 'jonas'
const letters = [...str, '', 'S.']
console.log(letters);
console.log(...str); // j o n a s


//objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'guiseppe' }
// console.log(newRestaurant);

const restaurantCopy = {...restaurant}
restaurantCopy.name = 'classic'
console.log(restaurantCopy);
