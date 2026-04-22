'use strict'

//functions accepting callback functions

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};


const upperFirstWord = function (str) {
    const [first, ...others] = str;
    return [first.toUpperCase(), ...others].join(' ')
};

//higher-order function
const transformer = function (str, fn) {
    console.log('original string: ', str);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`transformed by: ${fn.name}`);
};

//the transformer function does not care how the str is transformed it just does it, insted the code is abstracted away into other functions.
transformer('Javascript is the best', upperFirstWord);