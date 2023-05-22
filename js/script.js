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
const donationAmount = document.querySelectorAll('.donator-amount');
const btnModal = document.querySelectorAll('.btn-modal');
const modalWindow = document.querySelector('.modal');
const donateWindow = document.querySelector('.donate');
const modalClose = document.querySelector('.modal-close-window');
const campaignContainer = document.getElementById('campaign');
const slides = document.querySelectorAll('.news-slide');
const dotsContainer = document.querySelector('.dots');

// State variables
const donations = [3500, 7400, 1200, 5350];

// prettier-ignore
const campaigns = ['Against unemployment', 'Proper elderly care','Special education opportunities', 'Child protection program', 'Sponsor an orphan child'];

// Number formatter
const numberFormatter = function (number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
};

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

donations.forEach(function (amnt, i) {
  const donations = donationAmount[i];
  donations.textContent = numberFormatter(amnt);
});

// Close and open modal
const modalCloseOpen = function () {
  const openModal = function () {
    // Manipulates classes
    modalWindow.classList.remove('hide-modal');
    donateWindow.classList.remove('hide-modal');
  };

  const closeModal = function () {
    // Manipulates classes
    modalWindow.classList.add('hide-modal');
    donateWindow.classList.add('hide-modal');
  };

  // Add event listeners
  btnModal.forEach(function (btn, i, arr) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  modalWindow.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
};

modalCloseOpen();

// Populate the campaigns
const populateCampaigns = function () {
  // Loop over the campaigns
  campaigns.forEach(function (campaign, i, arr) {
    // Generate markup
    const html = `<option value="${campaign}">${campaign}</option>`;

    // Append to the UI
    campaignContainer.insertAdjacentHTML('beforeend', html);
  });
};

populateCampaigns();

// Slider component
const sliderComponent = function () {
  let currentSlide = 0;
  const maxSlide = slides.length;

  // Create dots
  const createDots = function () {
    slides.forEach(function (slide, i, arr) {
      // Generate markup
      const html = `<button class="dots-dot" data-slide="${i}"></button>`;

      // Append to the UI
      dotsContainer.insertAdjacentHTML('beforeend', html);
    });
  };

  // Activate dot
  const activateDot = function (slide) {
    document.querySelectorAll('.dots-dot').forEach(function (dot, i, arr) {
      dot.classList.remove('dots-dot--active');
    });

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add('dots-dot--active');
  };

  // Navigate to a slide
  const goToSlide = function (slide) {
    slides.forEach(function (s, i, arr) {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Init function
  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  // Event handlers
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  // setInterval(nextSlide, 10000);
};

sliderComponent();
