const text = 'javascript'
console.log(text.slice(1));
console.log(text.slice(0, 4));  //java
console.log(text.slice(-6));  //script
console.log(text.slice(-6, -3)); //scr


//substring
console.log(text.substring(4, 0));  //java - autamatically swaps to 0,4
console.log(text.substring(-5, 4)); //java - negative nr becomes 0 -> 0,4





//The -1 Trap: Always check if the result is > -1 because 0 is a "falsy" value but a valid index.
//searching
const phrase = "Blue Whale, Killer Whale";
console.log(phrase.indexOf("Whale"));  //5
console.log(phrase.lastIndexOf("Whale"));  //19


//includes, startswith,endswith
const email = "user@example.com";

console.log(email.includes("@"));      // true
console.log(email.startsWith("user")); // true



const mood = "bad day, bad weather";
// Edge Case: replace() only hits the first match if using a string
console.log(mood.replace("bad", "good"));    // "good day, bad weather"
console.log(mood.replaceAll("bad", "good")); // "good day, good weather"



//split
const tags = "js,python,rust";
console.log(tags.split(","));    // ["js", "python", "rust"]
//limit param
console.log(tags.split(",", 2));  //["js", "python"] (ignores the rest)


//padstart and padend  - for formatting dates or credit cards.
const hours = "5"
console.log(hours.padStart(2,"0")); //"05"

// Edge Case: String is already longer than target
console.log("100".padStart(2, "0")); // "100" (No change)


const input = "   hello  "
console.log(input.trim());  //hello


console.log("alphabet".toUpperCase()); // "ALPHABET"


console.log("abc".repeat(3)); // "abcabcabc"

// Edge Case: 0 repeats
console.log("abc".repeat(0)); // "" (Empty string)





//clean and capitalzie workflow
const userInput = "  gEmInI"

const cleanName = userInput.trim().toLocaleLowerCase();
const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
console.log(formattedName)  //Gemini;


//masking sensitive data


const creditCard = "1234567812345678";
const lastFour = creditCard.slice(-4);

const masked = lastFour.padStart(creditCard.length, "*");
console.log(masked);


//url slug generator
// /Turning a title into a URL-friendly string involves toLowerCase, replaceAll, and trim.
const title = "  Javascript String methods: 101.  "
const slug = title.trim().toLowerCase().replaceAll(":", "").replaceAll(".", "").replaceAll(" ", "-");

console.log(slug);