'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});





///////////////////////////////////
///////////////////////////////////

//selecting elements
console.log(document.documentElement); //entire html
console.log(document.head)
console.log(document.body);

const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section'); //returns nodelist
console.log(allSections)

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button'); //htmlcollection - live collection- if dom changes then the collection is updated immedialtey

//not the same with the nodelist
document.getElementsByClassName('btn') //returns also htmlcollection


//creating and insertin element
// .insertAdjacentHTML 
const message = document.createElement('div'); //its still not part of the dom - need to insert it
message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved functionality and analytics'
message.innerHTML = 'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>'
//insert in dom

//can use prepend and append not only to insert elements but also to move them
header.prepend(message); //adds element as first ch of element
// header.append(message)

//dom element is unique, it can only exist at one place at a time
header.append(message.cloneNode(true)); //creates two messaes


header.before(message) //insert node before header element as sibling
// header.after(message)


//delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove(); //recent method
  //before - dom traversing
  // message.parentElement.removeChild(message)
})