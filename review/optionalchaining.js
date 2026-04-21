'use strict'

//optional chaining

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

if(restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open);

//with optional chaining if a certain property does not exist,then undefined is returned immediately.
//only if there is mon property the open prop will be read, otherwise it will reutrn undefined (prop exists if its not null and not undefined.)
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon','tue','thu','sat','sun']
for (const day of days) {
    const open = restaurant.openingHours?.[day]?.open ?? 'closed';
    console.log(`On ${day} we open at ${open}`);
}


//methods
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");

//arrays
const users = [{ name: 'jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'user array is empty');


//without optinal chaining
if (users.length > 0) {
    console.log(users[0].name);
} else {
    console.log('user array empty');
}