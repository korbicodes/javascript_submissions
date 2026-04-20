// Grocery list/ expense estimator
// The goal is to take a string like "2x Milk - $4.50" and turn it into a JavaScript object.

function parseInput(str) {
    const [details, pricePart] = str.split('-');

    // separate the quantity from the name
    const [quantityPart, namePart] = details.split('x');

    // clean and convert
    const quantity = Number(quantityPart.trim());
    const name = namePart.trim();
    
    const price = Number(pricePart.replace('$', '').trim());

    return {
        name,
        quantity,
        price,
    };
}

const items = []
function addItem(inputStr) {
    items.push(parseInput(inputStr))
    return items
}

const calculateTotal = function (items) {
  const total = items.reduce((total, { quantity, price }) => {
        return total + quantity*price
  }, 0)
    return total
}


console.log(addItem('2x Milk - $4.50')); 
console.log(addItem('15x Organic Eggs - $12.00'));
console.log(calculateTotal(items));