'use strict'

//maps data structure: more useful than sets | used to map values to keys , data is stored in key value pairs, keys can be any type (obj, arrays...)


const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, //open 24 hours
            close: 24,
        },
        
    },
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    },
    orderDelivery: function ({ starterIndex=1, mainIndex=0, time='22:00', address }) {
        console.log(`${this.starterMenu[starterIndex]} and ${this.starterMenu[mainIndex]} will be delivered to ${address} at ${time}`)
    },
    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1},  ${ing2} and  ${ing3}`)
    }

};

const rest = new Map();
//add new element
rest.set('name', 'Classico Italiano');
rest.set(1, 'cologne, Germany');
console.log(rest.set(2, 'munich germany'));

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'we are open').set(false, 'we are closed');

console.log(rest.get('name'));
const time = 21;

console.log(rest.get(time > rest.get('open') && time < rest.get('close')));  //<=> rest.get(true)


//check if map contains a certain key
console.log(rest.has('cateogories'));
//delete elements
rest.delete('2');

//remove all elements
// rest.clear()



//can use arrays or objects as map keys
rest.set([1,2],'test')
console.log(rest.get([1, 2]));  //undefined - not the same object in heap

//solution
const arr = [1,2]
rest.set(arr,'test')
console.log(rest.get(arr));  //refers to same place in memory


//maps iteration

//same structure as object.entries()
const question = new Map(
    [
        ['question', 'what is best prog langugage'],
        [1, 'C'],
        [2, 'java'],
        [3, 'javascript']
        ['correct', 3]
        [true, 'correct✔'],
        [false, 'try again!']
    ]
)

console.log(question);

//convert object to map 
const hoursMap = new Map(Object.entries(openingHours))

//maps are also iterables, while objects arent
console.log(question.get('question'));
for (const [key, value] of question) {
    if(typeof key==='Number') console.log(`${key}: ${value}`);
}

const answer = Number(prompt("your answer"))
console.log(question.get(question.get('correct') === answer));


//convert map to array
const quest = [...question];

console.log(question.entries());
console.log(...[question.keys()]);
console.log([...question.values()]);