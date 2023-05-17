'use strict';

// Select DOM Elements
const header = document.getElementById('header');
const featureQuoteContainer = document.querySelector('.feature-quote');
const btnUp = document.querySelector('.btn-up');
const copyYear = document.querySelector('.copy-year');
const nav = document.querySelector('.nav');
const scrollLinks = document.querySelectorAll('.scroll-link');
const linksContainer = document.querySelector('.links-container');
const navBtn = document.querySelector('.nav-btn');
const navList = document.querySelector('.nav-list');

// Change copyright year
const changeCopyrightYear = function () {
  // Get the present year
  const today = new Date().getFullYear();

  // Append to the UI
  copyYear.textContent = today;
};
changeCopyrightYear();

// Random quotes
const randomQuote = async function () {
  try {
    // Get the quotes from an API
    const response = await fetch('https://type.fit/api/quotes');

    // Throw an exceptional error
    if (!response.ok) throw new Error('Error generating quote');

    // Convert the data to a json string
    const data = await response.json();

    // Get a random number from a sliced array
    const newQuoteArr = data.slice(0, 500);

    // Generate random number
    const randomInt = Math.floor(Math.random() * newQuoteArr.length + 1);

    // Random quote
    const randomQuote = newQuoteArr[randomInt];

    // Generate markup
    const html = `
      <h4 class="quote-title">${
        randomQuote.author === null ? 'Joel Nambala' : randomQuote.author
      }</h4>
      <p class="quote-text">${randomQuote.text}</p>
    `;

    // Append to the UI
    featureQuoteContainer.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    featureQuoteContainer.textContent = `Please check your internet connection`;
    featureQuoteContainer.style.color = `#dc2626`;
    featureQuoteContainer.style.fontSize = `16px`;
  }
};
randomQuote();

// Smooth scroll
scrollLinks.forEach(function (link, i, arr) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Navigate to a specific spot
    const id = e.currentTarget.getAttribute('href');
    const section = document.querySelector(id);

    if (section === null) return;

    // Calculate the heights
    const navHeight = nav.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = nav.classList.contains('fixed');

    let position = section.offsetTop - navHeight;

    if (!fixedNav) position = position - navHeight;
    if (navHeight > 82) position = position + containerHeight;

    window.scrollTo({
      top: position,
      left: 0,
      behavior: 'smooth',
    });

    linksContainer.style.height = 0;
  });
});

// Responsive navigation
const responseNavigation = function () {
  // Calculate the heights
  const navHeight = navList.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;

  // Add the height
  if (containerHeight === 0) linksContainer.style.height = `${navHeight}px`;
  else linksContainer.style.height = 0;
};

navBtn.addEventListener('click', responseNavigation);

// Show back to top button
const showBacktopBtn = function () {
  // Calculate the heights
  const headerHeight = header.getBoundingClientRect().height;
  const scrollHeight = window.scrollY;

  // Manipulate the styles
  if (scrollHeight > headerHeight - 100) btnUp.style.opacity = 1;
  else btnUp.style.opacity = 0;
};

// Fixed navigation bar
const fixedNavigation = function () {
  // Calculate the heights
  const scrollHeight = window.scrollY;
  const navHeight = nav.getBoundingClientRect().height;

  // Add the fixed class
  if (scrollHeight > navHeight) nav.classList.add('fixed');
  else nav.classList.remove('fixed');
};

window.addEventListener('scroll', function () {
  showBacktopBtn();
  fixedNavigation();
});
