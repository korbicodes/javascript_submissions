'use strict'

//strings
const airline = 'TAP Air Germany'
const plane = 'A320';

console.log(airline.indexOf('r')); //6
console.log(airline.lastIndexOf('r')); // 10

//search for entire words also
console.log(airline.indexOf('Germany'));  //case sensitive
console.log(airline.slice(4)); //air germany
console.log(airline.slice(4,7)); //air (end value is not included in the string)

//get the first word
console.log(airline.slice(0, airline.indexOf(' ')));  //tap
//get the last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(1, -1)); //removes first and last letter

const checkMiddleSeat = function (seat) {
    const s = seat.slice(-1)
    if (s ==='B' || s === 'E')console.log('you got the middle seat');else console.log('you got another seat');
};
checkMiddleSeat('11B');



//strings are primitives.whenever a method is called on a string, javascript will automatically bts convert the str primitive to a string object with the same content,and then its on that object where the methods are called.when the operation is done the object is converted back to a regular string primitive - all string methods return primitives.


//string methods
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
console.log('jonas'.toUpperCase());


const passenger = 'jOnas'; //Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect);



const email = 'hello@jonas.io'
const loginEmail = '   Hello@Jonas.Io \n'

const normalizedEmail = loginEmail.toLowerCase().trim()
console.log(normalizedEmail);

//remove white space in beginning or en: trime

//replacing - only replacs the first occurrence
const priceGB = '288,97e';
const priceUSA = priceGB.replace('e', '$').replace(',','.');
console.log(priceUSA);

//replaceAll - replace all occurrences of the searched string
const announcement = 'all passengers come to boarding door 23.boarding door 23!'

console.log(announcement.replaceAll('door', 'gate'));

//regular expression g-for global (before replaceAll)
console.log(announcement.replace(/door/g, 'gate'));

//booleans : enswith startswith includes
const theplane = 'A320neo';
console.log(theplane.includes('neo'));

//split and join
console.log('very+good+string'.split('+'));

const [firstName, lastName] = 'jonas schmed'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];
    for (const n of names) {
        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()))
    }
    console.log(namesUpper.join(' '));
}
capitalizeName('jessica and smith davis');
capitalizeName('jonas schmed');


//padding
const maskCreditCard = function (number) {
    const str = number + '';
    const last = str.slice(-4);
    return last.padStart(str.length, '*')
};

console.log(maskCreditCard(83289404))
console.log(maskCreditCard('293802'));


//repeat - same string multiple times
const message2 = 'Bad weather...All departures delayed... ';
console.log(message2.repeat(3));

const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${'✈ '.repeat(n)}`);
};

planesInLine(5);


const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')){
    const [type, from, to, time] = flight.split(';');
    const output = `${type.startsWith('_Delayed') ? '🔊' : ' '}${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(35);
    console.log(output);
}

