'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal'
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
          <div class="movements__value">${movement}€</div>
        </div>`
    //accepts 2 string, position where to attach html
    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
  
}

displayMovements(account1.movements)
//chaining many methods causes performace issues
//bad practice to chain methods that mutate the original array
const calcDisplaySummary = function (movements) {
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes}€`;
  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov,0)
  labelSumOut.textContent = Math.abs(out);
  const interest = movements.filter(mov => mov > 0).map(deposit => (deposit * 1.2 / 100)).filter((int, i, arr) => {
    console.log(arr);
    return int >= 1;
  }).reduce((acc, int) => acc + int,0)
  labelSumInterest.textContent = `${interest}€`

}
calcDisplaySummary(account1.movements)

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  })
}
createUsernames(accounts)
console.log(accounts)


const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance} EUR`

}

calcDisplayBalance(account1.movements)
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];  

// //SLICE METHOD
// console.log(arr.slice(2)); //c d e
// console.log(arr.slice(2,4)); // c d (length is end param - begin param)

// console.log(arr.slice(-1)); // e (last element of array)
// console.log(arr.slice(1, -2)); //takes everything besides the last 2 ones: b,c

// //shallow array copy using slice method
// //use slice to chain multiple methods
// console.log(arr.slice());
// //using spread operator
// console.log(([...arr]));

// //SPLICE METHOD
// //it mutates the original array
// console.log(arr.splice(2)); // c d e
// // arr.splice(-1) removes last element from original array
// console.log(arr); //a b - the original array is mutated


// //REVERSE - it mutates the original array
// arr = ['a', 'b', 'c', 'd', 'e'];  
// const arr2 = ['j','i','h','g','f']
// console.log(arr2.reverse()); //f g h i j

// //CONCAT METHOD - CONCATENATE TWO ARRAYS
// const letters = arr.concat(arr2);
// console.log(letters);
// //or
// console.log([...arr, ...arr2]);

// //JOIN METHOD 
// console.log(letters.join('-'));// a-b-c-d-e...


// //AT METHOD
// const array = [23,11,64]
// console.log(arr[0]);
// console.log(arr.at(0));
 
// //getting the last element - when not knowing the length of array
// console.log(arr[arr.length - 1]); //64
// console.log(arr.slice(-1)[0]); //64
// console.log(arr.at(-1)); //64


//looping arrays using forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i,movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i+1} You deposited ${movement}`)
//   } else {
//     console.log(`Movement ${i+1} you withdrew ${Math.abs(movement)}`)
//   }
// }


//loop over the array and in each iteration executes the callback function
//receives current element as an argument
//for each passes in the current element, the index and the entire , the order matters
// movements.forEach(function (movement,index,array) {
//   if (movement > 0) {
//     console.log(`Movement ${i+1} : You deposited ${movement}`)
//   } else {
//     console.log(`Movement ${i+1}: you withdrew ${Math.abs(movement)}`)
//   }
// });

//cannot break out of a forEach loop (cannot use break and continue)

//foreach with maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`)
// });

// //set - doesnt have keys
// //use __ to refer to a unused in JS: throwable variable
// const currenciesUnique = new Set(currencies);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value}: ${value}`)
// })

//data transformations: map , filter, reduce
// map returns a new array containing the results of applying an operation on all original array elements
// filter returns a new array containing the array elements that passed a specified a test condition
//reduce: reduces all array elements down to one single value (e.g adding all elements)


const euroToUsd = 1.1;

const usdMovement = movements.map(mov=>mov*euroToUsd)
console.log(usdMovement);


//using for of
// const moveUsd =[]
// for(const mov of movements) moveUsd.push(mov*euroToUsd)

//using all map paramenters
// const movementDescription = movements.map((mov, i, array) => {
//   if (mov > 0) {
//     return `Movement ${i+1}: You deposited ${mov}`
//   } else {
//     return `Movement ${i+1}: You withdrew ${Math.abs(mov)}`
//   }
// });

//for each method creates side , with the map you return each of the strings from the callback, added into a new array
const movementDescription = movements.map((mov, i) => {
  `Movement ${i+1}: You ${mov>0 ? 'deposited': 'withdrew'} ${Math.abs(mov)}`
})
// console.log(movementDescription)

//filter method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//reduce method - the first param is the accumulator(like snowball), second param is the initial value of the accumulator
// const balance = movements.reduce(function (acc,cur,i,arr) {
//   console.log(`Iteration ${i} : ${acc}`);
//   return acc + cur;
// }, 0);

//using arrow function
const balance = movements.reduce((acc,cur)=> acc+cur,0)
console.log(balance)

//get the maximum value
const max = movements.reduce((acc, cur) => {
  if (acc > cur) {
    return acc
  } else {
    return cur;
  }
 }, movements[0]);

console.log(max);


//chaining methods - as long as they return new methods
const totaldeposists = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((acc, mov) => acc + mov, 0);
console.log(totaldeposists);

//to check the result of the filter method in case there is a bug
// const totaldeposists = movements.filter(mov => mov > 0).map((mov, arr) => {
//   console.log(array);
//   return mov * euroToUsd;
// }).reduce((acc, mov) => acc + mov, 0);
// console.log(totaldeposists);
