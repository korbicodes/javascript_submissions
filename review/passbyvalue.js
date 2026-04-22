'use strict'

//javascript does not have pass by reference, only pass by value

const flight = 'LH234'
const jonas = {
    name: 'jonas',
    passport: '230495867'
};

const checkIn = function (flightNumber, passenger) {
    flightNumber = 'LH999'
    passenger.name = 'Mr ' + passenger.name[0].toUpperCase() + passenger.name.slice(1); //same object as jonas in memory heap
    if (passenger.passport === '230495867') {
        console.log('checked in');
    } else {
        console.log('wrong passport');
    }
};

checkIn(flight, jonas);
console.log(flight,jonas);

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000)
};


//two functions manipulating the same object
newPassport(jonas)
checkIn(flight, jonas); //wrong passport 
