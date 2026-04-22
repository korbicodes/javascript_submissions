'use strict'

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
};

greet('hello')('alessia');

//rewriting using arrow functions
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('Hellooo')('Jonas')