'use strict';

// Select DOM Elements
const header = document.getElementById('header');
const featureQuoteContainer = document.querySelector('.feature-quote');
const btnUp = document.querySelector('.btn-up');

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
    featureQuoteContainer.textContent = `${err.message}`;
  }
};
randomQuote();

// Show back to top button
const showBacktopBtn = function () {
  // Calculate the heights
  const headerHeight = header.getBoundingClientRect().height;
  const scrollHeight = window.scrollY;

  // Manipulate the styles
  if (scrollHeight > headerHeight) btnUp.style.opacity = 1;
  else btnUp.style.opacity = 0;
};

window.addEventListener('scroll', function () {
  showBacktopBtn();
});
