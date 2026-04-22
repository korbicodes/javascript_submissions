'use strict'

//the bind method
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum,name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight : `${this.airline} flight ${this.iataCode}${flightNum}`, name})
    }
};;

const euroAir = {
    airline: 'euroAir',
    iataCode: 'EA',
    bookings: [],
};
const book = lufthansa.book;

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'SW',
    bookings: [],
};

//returns new function where this keyword will always be euroair

const bookEA = book.bind(euroAir) 
const bookLH = book.bind(lufthansa)
const bookSW = book.bind(swiss)

bookEA(32,'steve')

//can use bind for a specific airline and a specific flight
//this common pattern is called partial application (a part of args of the original functions are already applied,already set.)
const bookEA23 = book.bind(euroAir,23)
bookEA23('jonas')
bookEA23('sumey');

