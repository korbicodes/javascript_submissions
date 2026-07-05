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
  type: 'premium'
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard'

};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium'

};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic'

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


const displayMovements = function (account, sort=false) {
  containerMovements.innerHTML = '';
  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements
    
  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal'
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
          <div class="movements__value">${movement}€</div>
        </div>`
    //accepts 2 string, position where to attach html
    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
  
}


//chaining many methods causes performace issues
//bad practice to chain methods that mutate the original array
const calcDisplaySummary = function (account) {
  const incomes = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes}€`;
  const out = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov,0)
  labelSumOut.textContent = Math.abs(out);
  const interest = account.movements.filter(mov => mov > 0).map(deposit => (deposit * account.interestRate / 100)).filter((int, i, arr) => {
    console.log(arr);
    return int >= 1;
  }).reduce((acc, int) => acc + int,0)
  labelSumInterest.textContent = `${interest}€`

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
  console.log(balance)
  labelBalance.textContent = `${balance} EUR`
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

let currentAccount;
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

  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)) {
    currentAccount.movements.push(loan)
    
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
console.log(account4.movements.every(mov => mov > 0))

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

