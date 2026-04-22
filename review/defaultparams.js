'use strict';

//default parameters

const bookings = []

const createBooking = function (flightNumber, numPassgengers = 1, price = 70 * numPassgengers) {
    const booking = {
        flightNumber,
        numPassgengers,
        price
    }
    console.log(booking);
    bookings.push(booking)
};

createBooking('LH123')
createBooking('Lh123',53)

// setting a parameter to undefined is the same as not even setting it.so when you dont pass an argument into that parameter then it will take the value of undefined.
//so here the numberofpassengers will be 1
createBooking('LH123',undefined,1000)