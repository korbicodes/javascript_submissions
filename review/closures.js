'use strict'

//closures
const secureBooking = function () {
    let passengerCount = 0;
    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
};


const booker = secureBooking();
booker();
//closures makes a function remember all the variables that existed from p funciton by the times was created.
booker();
console.dir(booker); //[[scopes]] -[[]]internal property that cant be accessed from the code--shows the closure , the var env of secure booking.




let f;
const g = function () {
    const b = 23;
    f = function () {
        console.log(b*2);
    }
};

const h = function () {
    const d = 777;
    f = function () {
        console.log(d*2);
    }
};

g();
f(); //at this point of execution var env of g is no longer there, but f function closed over that var env hence its able to access the a variable.
console.dir(f) //[[scopes]]: scopes[3]  0:closure(h) -b:23
//re-assigning f function
h();
f();  //1554

console.dir(f) // [[scopes]]: scopes[3]  0:closure(h) -d:777




const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(() => {
        console.log(`Boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);
    console.log(`Will start boarding in ${wait} seconds`);
}

//If the scope chain had priority over the closure then the callback function will use the perGroup global variable , as the function is executed in the global scope, but closure even has priority over the scope chain, in this case it does not use the perGroup var in the global scope, but the perGroup inside the boardPassengers.
const perGroup = 1000;
boardPassengers(180,3)