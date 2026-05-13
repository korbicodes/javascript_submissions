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



//with event listeners
lufthansa.planes = 300; 
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++
    console.log(this.planes);
};

lufthansa.buyPlane()// lufthansa.buyPlane();  //this keyword here is lufthansa


//in an event handler functio the this keyword point to the element on which the handler is attached to , so buyplane is attached to the button: document.querySelector('.buy'), hence inside the buyplane function this keyword will point to the button element, therefore need to manually define the this keyword, but need to use a function, which does not call , in this case bind is the solution as it does not call but returns the function
document.querySelector('.buy').addEventListener('click',lufthansa.buyPlane.bind(lufthansa))