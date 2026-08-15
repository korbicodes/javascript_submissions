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

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords)

  //get current scroll position
  console.log(window.pageXOffset, pageYOffset)
  //height and width of the viewport
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)


  //scrolling
  //current position + current scroll
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })
  section1.scrollIntoView({behavior: 'smooth'})
})










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
// header.append(message.cloneNode(true)); //creates two messaes


// header.before(message) //insert node before header element as sibling
// header.after(message)


//delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove(); //recent method
  //before - dom traversing
  // message.parentElement.removeChild(message)
});

//styles 
message.style.backgroundColor = '#37383d';
message.style.width = '120%'

//works only for inline style
console.log(message.style.height);

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color)
console.log(getComputedStyle(message).height)

message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px'

//document.documentElement //root in css
// document.documentElement.style.setProperty('--color-primary','orangered')

//attributes
//if they are part of html than js will automatically create these properties on the object.
const logo = document.querySelector('.nav__logo');
console.log(logo.alt)
//the absolute url
console.log(logo.src);
//relative url
console.log(logo.getAttribute('src'))
console.log(logo.className);

const link = document.querySelector('.twitter-link')
console.log(link.href)
console.log(link.getAttribute('href'));


//data attributes
//for these special attr they are always stored in the dataset object
//data attr are used a lot when working with UI especially when storing data in UI
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('b','j')
logo.classList.remove('b')
logo.classList.toggle('b')
logo.classList.contains('b')

//dont use as it will override all existing classes
logo.className - 'jonas'

