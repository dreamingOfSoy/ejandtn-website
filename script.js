'use strict';

// Element Selectors
const copyrightDate = document.querySelector('.copy-date');
const navLinks = document.querySelectorAll('.link-scroll');
const header = document.querySelector('.header');
const stickyNav = document.querySelector('.sticky-nav');
const stickyNavHeight = document.querySelector('.sticky-nav').offsetHeight;

/* ////////////////////////////////////// */
// Keep date in footer up to date
/* ////////////////////////////////////// */
const date = new Date();
const year = date.getFullYear();
copyrightDate.textContent = year;

/* ////////////////////////////////////// */
// Smooth Scrolling
/* ////////////////////////////////////// */
// Loops over the nodelist.
navLinks.forEach(link => {
  function scrollToElement(e) {
    e.preventDefault();

    // Returns the value in the href of the anchor element, such as #music.
    const href = link.getAttribute('href');

    // If href on anchor is just # (the default) it will scroll to the top of the page. Useful for clicking logo to return to top.
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    // Uses the returned href, such as #music, and utilises that this is how you also select ID's using querySelector to select the correct section to scroll to.
    const element = document.querySelector(href);
    // Uses this element to calculate the current position of the top of the element.
    const elementPosition = element.getBoundingClientRect().top;
    // Caculates the correct position to scroll to. (window.pageYOffset must be used here so that the current location of the viewport from the top of the page can be offset depending on how many pixels the scrolling moved. For example, if the page is scrolled down 200px and the element to scroll to is -100px away, -100px, is lower than 0, so this will force a scroll of the top of the page, the pageYOffset, here, will then add the offset, which will be 200px back on, resulting in 100px, the correct location of the scroll).
    const scrollTo = elementPosition + window.pageYOffset - stickyNavHeight;

    if (href !== '#' && href.startsWith('#')) {
      window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });
    }

    if (stickyNav.classList.contains('nav-open')) {
      stickyNav.classList.toggle('nav-open');
    }
  }
  // For each link it find the href and applies smooth scrolling to it.
  link.addEventListener('click', scrollToElement);
});

/* ////////////////////////////////////// */
// Making Nav Sticky
/* ////////////////////////////////////// */
const headerObserver = new IntersectionObserver(function (entries) {
  const [entry] = entries;
  entry.isIntersecting === false
    ? stickyNav.classList.add('display')
    : stickyNav.classList.remove('display'),
    { root: null, threshold: 0, rootMargin: `-${stickyNavHeight}px` };
});

headerObserver.observe(header);

/* ////////////////////////////////////// */
// Making Mobile Nav Work
/* ////////////////////////////////////// */

const btnMobNav = document.querySelector('.btn-mobile-nav');
btnMobNav.addEventListener('click', function () {
  stickyNav.classList.toggle('nav-open');
});

/* ////////////////////////////////////// */
// Making Modal Work
/* ////////////////////////////////////// */

// Album Modal
const [...albumArtwork] = document.querySelectorAll('.art-box');
const [...modals] = document.querySelectorAll('.modal-body');
const modalContainer = document.querySelector('.album-modal');

// Loops over an array of elements.
albumArtwork.forEach(artwork => {
  // For each element, it adds an event listener.
  artwork.addEventListener('click', function () {
    // Using findIndex to return the number the element is in the array.
    const albumNum = albumArtwork.findIndex(index => index === artwork);
    // Loops over all the available modals (a different modal for each album)
    modals.forEach(modal => {
      // For each modal, determine is the dataset matches the image that was clicked in order to load the correct model.
      if (albumNum === +modal.dataset.modal) {
        modalContainer.classList.remove('nodisplay');
        modal.classList.remove('nodisplay');
      }
    });
  });
});

//Video Modal
const [...videoArtwork] = document.querySelectorAll('.video-box');
const [...videoModals] = document.querySelectorAll('.video-container');
const videoContainer = document.querySelector('.video-modal');

videoArtwork.forEach(video => {
  console.log(video);
  video.addEventListener('click', function () {
    const videoNum = videoArtwork.findIndex(index => index === video);
    console.log(videoNum);
    videoModals.forEach(modal => {
      if (videoNum === +modal.dataset.video) {
        videoContainer.classList.remove('nodisplay');
        modal.classList.remove('nodisplay');
      }
    });
  });
});

/* ////////////////////////////////////// */
// Making Modal Close
/* ////////////////////////////////////// */

const closeModal = document.querySelectorAll('.close-modal');

// Click the X on each modal to close the modal.
closeModal.forEach(close =>
  close.addEventListener('click', function () {
    modalContainer.classList.add('nodisplay');
    modals.forEach(modal => modal.classList.add('nodisplay'));
  })
);

// Click outside of modal body (the fades part) to exit modal as well as click the X.
modalContainer.addEventListener('click', function (e) {
  if (e.target === modalContainer) {
    modalContainer.classList.add('nodisplay');
    modals.forEach(modal => modal.classList.add('nodisplay'));
  }
});
