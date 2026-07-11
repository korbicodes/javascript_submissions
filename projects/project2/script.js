'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2026-07-09T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2026-07-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2026-07-10T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2]
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


let currentAccount;

const formattedDate = function (date1, date2,locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const days = calcDaysPassed(date1, date2);
  if (days ===0) {
    return 'Today';
  }
  if (days ===1) {
    return 'Yesterday';
  }
  if (days <= 7) {
    return `${days} days ago`;
  }
  else {
    // const date = new Date(date1);
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth()}`.padStart(2, 0);
    // const year = `${date.getFullYear()}`.padStart(2, 0);
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date1)
  }
}
const currencyFormat = (value)=>{
   const formattedMov = new Intl.NumberFormat(currentAccount.locale, {
      style: 'currency',
      currency: currentAccount.currency
   }).format(value)
  
   return formattedMov
}

const displayMovements = function (account, sort=false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = account.movements.map((mov, i) => ({
    movement: mov,
    movementDate: account.movementsDates.at(i)
  }))

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);
  

  combinedMovsDates.forEach(function (obj, index) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal'

    //currency is independent from the locale
    const formattedMov = currencyFormat(movement)
    
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div><div class="movements__date">${formattedDate(new Date(movementDate), new Date(),account.locale)
          }</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`
    //accepts 2 string, position where to attach html
    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
  
}


//chaining many methods causes performace issues
//bad practice to chain methods that mutate the original array
const calcDisplaySummary = function (account) {
  const incomes = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = currencyFormat(incomes);
  const out = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov,0)
  labelSumOut.textContent = currencyFormat(Math.abs(out));
  const interest = account.movements.filter(mov => mov > 0).map(deposit => (deposit * account.interestRate / 100)).filter((int, i, arr) => {
    console.log(arr);
    return int >= 1;
  }).reduce((acc, int) => acc + int,0)
  labelSumInterest.textContent = currencyFormat(interest)

}

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  })
}
createUsernames(accounts)
console.log(accounts)



const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  // console.log(balance)
  labelBalance.textContent = currencyFormat(account.balance);
}


//event handler
//in html in the default behavior when you click a submit button is
//for the page to reload - will have to prevent using preventdefault (prevent form from submitting)
//hitting enter in input fields also triggers enter

//currentacount info is needed also in other function of app - declared outside of the function

const updateUI = function (acc) {
    //display movements 
    displayMovements(acc)
    //display balance
    calcDisplayBalance(acc)
    //display summary
    calcDisplaySummary(acc)
}


btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log(currentAccount);
  //use optional chaining to know if the current account exists
  if(currentAccount?.pin === Number(inputLoginPin.value))
  {
    //display UI and the welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 1;

    // const day = `${date.getDate()}`.padStart(2,'0')
    // const month = `${date.getMonth() + 1}`.padStart(2,0);
    // const year = `${date.getFullYear()}`.padStart(2, 0)
    // const hour = `${date.getHours()}`.padStart(2,0)
    // const minutes = `${date.getMinutes()}`.padStart(2,0)
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`
    const date = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //or long // ir 2-digit
      year: 'numeric', //or 2 digit
      //weekday: long /short
    }
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(date)

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount)
  }
}) 



//transfering money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value)
  inputTransferAmount.value = inputTransferTo.value = '';
  
  if (receiverAccount && currentAccount.balance >= amount && amount > 0 && receiverAccount?.username !== currentAccount.username) {
    //doing the transfer
    currentAccount.movements.push(-amount)
    receiverAccount.movements.push(amount)

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAccount.movementsDates.push(new Date().toISOString())

    updateUI(currentAccount)
  }
})



//delete account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const userPin = Number(inputClosePin.value)
  if (user === currentAccount.username && userPin === currentAccount.pin) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username 
    })
    accounts.splice(index, 1)
    console.log(accounts)

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
  
})


//request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault()
  //math.floor does type coercion itself - round values down
  const loan = Math.floor(inputLoanAmount.value);
  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)) {
    currentAccount.movements.push(loan)

    //add loan date
    currentAccount.movementsDates.push(new Date().toISOString())
    
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''

})


//declare state variable
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  console.log('ok')
  displayMovements(currentAccount, !sorted)
  sorted = !sorted;
})








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



//find method loops over the array - also accepts a callback function, called  as method loops over the array - retrives an element of the 
//does not return a new array - returns the first el of array of which the condition is true
const firstWithdrawal = movements.find(mov=>mov<0)
console.log(movements)
console.log(firstWithdrawal)

console.log(accounts);
//finding based on property 
const account = accounts.find(acc=> acc.owner === 'Jessica Davis')
console.log(account);


//findIndex - works same as find
//returns the index of the found element, not the element itself
//can use it for the close account feature - delete the account object from the accounts array - use the splice method.



//findlast and findLastIndex
console.log(movements)
//find last value that is less value, using find start from beginning
const lastWithDrawal = movements.findLast(mov => mov < 0);
console.log(lastWithDrawal);




console.log(`Your latest largest movements was ${movements.length - movements.findLastIndex(mov => mov > 1000)} movements ago`);


//some and every

//some
console.log(movements)
//EQUALITY
console.log(movements.includes(-130))


//CAN SPECIFY A CONDITION
console.log(movements.some(mov=>mov === -130))
//check for deposits movements in the array
const anyDeposits = movements.some(mov=>mov>500)
console.log(anyDeposits)



//every - only returns true if all elements fulfill the condition
// console.log(account4.movements.every(mov => mov > 0))

//separate callback
const deposit = mov => mov > 0;
movements.some(deposit)



//flat and flatMap
const arr = [[1,2,3],[4,5,6],7,8]
console.log(arr.flat());


const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat(2)); //reach second level of nesting

const accountMovements = accounts.map(acc=> acc.movements)
console.log(accountMovements);
const allMovements = accountMovements.flat()
console.log(allMovements);

const overallBalance = allMovements.reduce(function(acc, mov){
  return acc+mov
}, 0);
console.log(overallBalance)


//using a map and then flatening is a common operation
const overalBalance = accounts.map(acc=>account.movements).flat().reduce(function(acc, mov){
  return acc+mov
}, 0);


//flatmap() --  combines a map and flat method into just one method better for performance
const overalBalance2 = accounts.flatMap(acc => accounts.movements).reduce((acc, mov) => acc + mov, 0);


//sorting arrays
//strings
const owners = ['jonas', 'zach', 'adam','martha']
console.log(owners.sort()); //sorted alphabetically - it mutates the original array

//numbers
console.log(movements);
console.log(movements.sort()); //not ordered - sort does sorting based on strings


//return < 0 , A,B (keep order)
//return > 0 , B,A (switch order)
//sorted in ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

//ascending
movements.sort((a,b)=>a-b)

//descending
movements.sort((a,b)=>b-a)
console.log(movements);



//array grouping - group values in array based in condition
console.log(movements)
const groupedMovements = Object.groupBy(movements, movement => movement > 0 ? 'deposits' : 'withdrawals');
console.log(groupedMovements);


const grupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;
  if (movementCount > 8) return 'very active'
  if(movementCount >= 4) return 'active'
  if(movementCount >= 1) return 'moderate'
  return 'inactive'


});

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
const groupedAccounts = Object.groupBy(accounts, ({type})=>type)
console.log(groupedAccounts);

//creating and filling arrays
console.log([1,2,3,4,5,6,7])
console.log(new Array(1,2,3,4,5,6,7))

//empty arrays + fill method
const b = new Array(7); //creates an element with 7 empty elements(empty x 7)
console.log(b);

//one one element can use the fill method
// b.fill(1) - it mutates the original array
b.fill(1, 3); //starts filling at index 3

b.fill(1, 3, 5);//fill with 1s from index 3 to 5 (5 not included)
console.log(b) //[empty x 3, 1,1,1,1]



// Array.from  - using from on an Array() constructor
//better way
const e = Array.from({length:7}, ()=> 1)
console.log(e);

//callback function arguments: current element and current index
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);



//can convert iterables (maps,sets,strings) into arrays using Array.from
//queryselectAll returns a nodelist - smth like an array but not a real array ,hence it does not have array methods

//solution: convert nodelist into an 
//pretend the movements are not stored in an array, but you get the value from the UI

const movementsUI = Array.from(document.querySelectorAll('.movements__value'))
console.log(movementsUI);

//can attach addevenet listener to every object, it does not have to be a button

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el=>Number(el.textContent.replace('€','')))
  // console.log(movementsUI.map(el=>Number(el.textContent.replace('€',''))))
});




//non-destructive alternatives : toReversed, toSorted, toSpliced, with - most of the times do not want to mutate the original array
const reversedMovements = movements.reverse(); //mutates teh original array

//can do this
//const reversedMovements = movements.slice().reverse()

//toReversed replaces this step slice.reverse

const newReversed = movements.toReversed()


//toSorted (sort), toSpliced (splice) , work the same way but do not change the original array


//movements[1] = 2000
const newMovements = movements.with(1,2000) // array movements but updated at index 1 with the value 2000




//array methods practice
// const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum)

// //2
// const numDeposists1000 = accounts.flatMap(acc=>acc.movements).filter(mov=>mov>=1000).length
// //or
// const deposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => {
//   cur >=1000 ? ++count : count
// },0)


//3
// const sums = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
//   // cur > 0 ? sum.deposits += cur : sum.withdrawals += cur;
//   // return sums;
//   sums[cur > 0 ? 'deposists' : 'withdrawals'] += cur;
// }, { deposits: 0, withdrawals: 0 });

// console.log(sums)

//4
// const convertTitleCase = function (title) {
//   const capitalize = str=>str[0].toUpperCase() + str.slice(1)
//   const excepetions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with']

//   const titleCase = title.toLowerCase().split(' ').map(word => excepetions.includes(word) ? word : capitalize(word).join(' '));
  
//   return capitalize(titleCase);
// }

// console.log(convertTitleCase('this is a good title'))





//NUMBERS - all numbers are represented as floating point numbers
// console.log(23 === 23.0);  //true

// //conversion
// console.log(+'23'); //23 as number


// //parsing
// //global functions
// console.log(Number.parseInt('30px')); //30 - stings needs to start a number - to get rid of symbols that are not numbers
// console.log(Number.parseFloat('2.5rem')); //2.5
// //can also
// console.log(parseFloat('2.5rem'))

// //check if value is not a number
// console.log(Number.isNaN(20)); //false
// console.log(Number.isNaN('20p'))
// console.log(Number.isNaN(23/0))

// //check if value is number
// console.log(Number.isFinite(20)); //true

// console.log(Number.isInteger(23))


// //math and rounding
// console.log(Math.sqrt(24));

// console.log(25 ** (1 / 2)); //5
// console.log(8 ** (1 / 3));  // 2 cubic root of 8

// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, '23', 11, 2));//23 it does type coercion
// console.log(Math.max(5, 18, '23px', 11, 2)); //NaN does not do parsing


// console.log(Math.min(5, 18, 23, 11, 2));
// console.log(Math.PI * Number.parseFloat('10px') ** 2); //sqaure area of circle

// console.log(Math.trunc(Math.random() * 6) + 1); //random 1-6

// const randomInt = (min, max) => {
//   const random = Math.floor(Math.random() * (max - min + 1)) + min;
//   return random;
// }


// console.log(randomInt(10, 20));


// //rounding
// //rounding integers
// console.log(Math.trunc(23.3)); //removes the decimal part 23
// console.log(Math.round(23.9)); //round to nearest integer  24

// console.log(Math.ceil(23.3)); //24 rounds up
// console.log(Math.ceil(23.9));  //24

// console.log(Math.floor(23.9));  //23
// console.log(Math.floor(23.9));  //23


// console.log(Math.trunc(-23.3));  //-23
// console.log(Math.floor(-23.3));  //-24 (with negative numbers works the other way around)



// //rounding decimals
// //2.7 is a primitive, but js does boxing so it converts it to a number object, then call the method on that object, once operation is finished it will convert it back to a primitive
// console.log((2.7).toFixed(0)); //3 returns a string
// console.log((2.7).toFixed(3)); //2.700 returns a string (3 decimal parts)
// console.log((2.345).toFixed(2)); //2.35 returns a string
// //convert the result to a  number
// console.log(+(2.345).toFixed(0)); //2.35 as a number





// //the remainder operator - returns the remainder of a division
// console.log(5 % 2) //1


// const isEven = n => n % 2 === 0;
// console.log(isEven(8)); //true


// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if(i % 2 === 0) row.style.backgroundColor = 'orange'
//   })
// });


// //numeric separators - underscores which make it easier to understand large numbers, can be placed between numbers only
// const diameter = 287_460_000_000; //the engine ignores these uderscores
// console.log(diameter)

// const priceCents = 345_59;

// const transeferFee = 15_00;


// //working with BigInt - numbers are represented as 64 bits (1s and 0s) - 32 are used to store the digits, the others are used to store the position of decimal points and sign.
// console.log(2 ** 53 - 1); //biggest nr javascript can represent
// //same number
// console.log(Number.MAX_SAFE_INTEGER)

// //in es2020 bigint came
// console.log(230290983747272n); //n transforms a regular nr into a bigint number
// console.log(BigInt(9732971983));

// //operations
// console.log(10000n + 10000n);
// console.log(972131291129n * 10000n)


// const huge = 21928109382948302n;
// const num = 23;
// console.log(huge * num); //error cannot mix bigint and other types
// //solution
// console.log(huge * BigInt(num));
// console.log(Math.sqrt(16n)) //does not work


// //exceptions
// console.log(20n > 15); //true
// console.log(20n === 20) //false
// console.log(typeof 20n); //bigint
// console.log(20n == 20); //true

// console.log(huge + 'is big number') //bigint number is converted to a string

// console.log(10n / 3n); //3n
// console.log(10 / 3); //3.33333

// console.log(new Date(account1.movementsDates[0]))
// console.log(new Date(2037,10))


// //CREATING DATES AND TIMES
// //creating
// const now = new Date()
// console.log(now); //current date and time
// console.log(new Date('Aug 02 2020 18:05:41'))
// console.log(new Date('December 24, 2015'));


// //month is zero based - 10 is november
// console.log(new Date(2037, 10, 19, 15, 23, 5)); //thu nov 19 2037 15:23:05
// //js autocorrects the date
// console.log(new Date(2037, 10, 31)); //thu dec 01
// console.log(new Date(2037,10,33)) //thu dec 03

// console.log(new Date(0))
// console.log(new Date(3 * 24 * 60 * 60 * 1000));


// //working with dates
// const later = new Date(2037, 10, 19, 15, 23);
// console.log(later.getFullYear()); //2037
// console.log(later.getMonth()); //10 -11
// console.log(later.getDate()) // gets the day of the month: 19
// console.log(later.getDay())// gets the day of the week: 4 (which is thursday)
// console.log(later.getHours()) //15
// console.log(later.getMinutes())//23
// console.log(later.getSeconds())//0
// console.log(future.ISOString()); //iso string international standard
// console.log(later.getTime); //timestamp , the miliseonds passed since jan 1 1970


// //set methods - for year,month,day...they all perform autocorrection
// later.setFullYear(2040)





//OPERATIONS WITH DATES
//when converting date to number, the result is the timestamp in ms

// const later = new Date(2037,10,19,15,23)
// console.log(Number(later))
// console.log(+later) //same result

// //return number of days
// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 *60*60*24);

// const days1 = calcDaysPassed(new Date(2037,3,14),new Date(2037,3,24))
// console.log(days1) //10 (april 24 to april 14 are 10 days)






//INTL INTERNATIONALIZING NUMBERS
// const num = 3884764.

// const options = {
//   style: 'currency',
//   currency: 'EUR',
//   useGrouping: false
// }

// console.log('US: ', new INtl.NumberFormat('en-US',options).format(num)); //3,884,754.23
// console.log('Germany', new INtl.NumberFormat('de-DE', options).format(num)) //3.884.754,23
// console.log('Browser', new INtl.NumberFormat(navigator.language, PushSubscriptionOptions), format(num))



//TIMERS
//set timeout timer runs just once after a defined time
//set interval timer keeps running until you stop

//execute function after 3s (schedule function call after 3seconds)
const ings = ['olives','spinach']
const pizzaTimer = setTimeout((ing1,ing2) => console.log('here is your order with ', ing1, ing2),3000, ...ingridients);
console.log('waiting...'); //it does not stop this line from executing which is called asynchronous js

if(ingridients.includes('spinach')) clearTimeout(pizzaTimer)

//can cancel the times before the delay