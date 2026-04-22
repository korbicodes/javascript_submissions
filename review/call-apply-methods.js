'use strict'

const { useLayoutEffect } = require("react");

//the call and apply methods

const lufhansa = {
    airline: 'lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.airline} flight ${this.iataCode}${flightNum}`, name})
    }
};

lufhansa.book(239, 'jonas')
lufhansa.book(635, 'john');

const euroAir = {
    airline: 'euroAir',
    iataCode: 'EA',
    bookings: [],
};



//store the function in the external function, this function is a copy but not a method, its a function
const book = lufhansa.book;

//in a regular function, this keyword points to undefined, in strict mode
//does not work
// book(23,'sarah')


//how to tell js what the this keyword should look like, using(call,apply, bind)
//in call method, first arg is what the this keyword should point to

book.call(euroAir,23,'sarah')
console.log(euroAir);

//apply method - same thing, does not receive args but an array of arguments, not used too much in modern js

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'SW',
    bookings: [],
};
book.call(swiss, 27, 'sumey');

const flightData = [592,'george']
console.log(...flightData);

book.apply(swiss, flightData);
console.log(swiss);

//can do this
book.call(swiss,...flightData)