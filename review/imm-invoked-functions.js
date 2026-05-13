'use strict'

//immediately invoked function expression
//sometimes functions that are only executed once are needed and dissapears once its called once - not very used in modern js


//use () to transform the statement into an expression

    (function () {
    console.log('this will only run once');
        const functionScoped = 23; //encapsulated data
})() //immediately call the function

(()=>console.log('this one will also run once'))


{
    const isScoped = 32;
    var notScoped = 31;
}