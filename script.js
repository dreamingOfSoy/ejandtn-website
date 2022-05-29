'use strict';

// Element Selectors
const copyrightDate = document.querySelector('.copy-date');
const navLinks = document.querySelectorAll('.link-scroll');
const header = document.querySelector('.header');
const stickyNav = document.querySelector('.sticky-nav');
const stickyNavHeight = document.querySelector('.sticky-nav').offsetHeight;
const btnMobNav = document.querySelector('.btn-mobile-nav');
const [...albumArtwork] = document.querySelectorAll('.art-box');
const [...modals] = document.querySelectorAll('.modal-body');
const modalContainer = document.querySelector('.album-modal');
const albumGallery = document.querySelector('.album-gallery');
const container = document.querySelector('html');
const [...videoArtwork] = document.querySelectorAll('.video-box');
const [...videoModals] = document.querySelectorAll('.video-container');
const videoGallery = document.querySelector('.video-gallery');
const videoContainer = document.querySelector('.video-modal');
const closeModal = document.querySelectorAll('.close-modal');
const [...video] = document.querySelectorAll('.video');
const [...youtubeVid] = document.querySelectorAll('.youtube-video');

/* ////////////////////////////////////// */
// Keep year in footer up to date
/* ////////////////////////////////////// */
const date = new Date();
const year = date.getFullYear();
copyrightDate.textContent = year;

/* ////////////////////////////////////// */
// Smooth Scrolling
/* ////////////////////////////////////// */
// Loops over the nodelist.

function scrollToElement(e) {
  e.preventDefault();

  // Returns the value in the href of the anchor element, such as #music.
  const href = this.getAttribute('href');

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

  // If href on anchor is not just # but also starts with # (which is also how you select ID's) and then scrolls to the specified location calculated by scrollTo, with a 'smooth' behaviour.
  if (href !== '#' && href.startsWith('#')) {
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  }

  // This makes the mobile nav bar work, so that when you click a link in the mobile nav, it closes the nav so it's not in the way. (The nav-open class is in a media query as it only need to work when in mobile view).
  if (stickyNav.classList.contains('nav-open')) {
    stickyNav.classList.toggle('nav-open');
  }
}

/* ////////////////////////////////////// */
// Making Nav Sticky
/* ////////////////////////////////////// */

// Creates an observer to calculate when to show or remove the sticky nav.
const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    entry.isIntersecting === false
      ? stickyNav.classList.add('display')
      : stickyNav.classList.remove('display');
  },
  { root: null, threshold: 0, rootMargin: `-${stickyNavHeight}px` }
);

// Calls the observe method on the observer with the desired element to observe.
headerObserver.observe(header);

/* ////////////////////////////////////// */
// Making Mobile Nav Work
/* ////////////////////////////////////// */

// Adds and removes a class to show and hide the mobile nav bar when in mobile view.
btnMobNav.addEventListener('click', function () {
  stickyNav.classList.toggle('nav-open');
});

/* ////////////////////////////////////// */
// Making Modal Work
/* ////////////////////////////////////// */

// Function that takes an array and returns the matched value.
function findIndex(arr, value) {
  return arr.findIndex(index => index === value);
}

// Function that determine if a value matches another and applies/removes classes.
function matchNumbers(valOne, valTwo, elementOne, elementTwo) {
  if (valOne === valTwo) {
    container.classList.add('nooverflow');
    elementTwo.classList.remove('nodisplay');
    elementOne.classList.remove('nodisplay');
  }
}

// Album Modal
// Opens Modal
function openAlbumModal(e) {
  console.log(e);
  e.preventDefault();
  // Using findIndex to return the number the element is in the array.
  const albumNum = findIndex(albumArtwork, this);
  const videoNum = findIndex(videoArtwork, this);

  if (e.target.closest('.album-gallery') === albumGallery)
    // Loops over all the available modals (a different modal for each album)
    modals.forEach(modal =>
      // For each modal, determine if the dataset matches the image that was clicked in order to load the correct model.
      matchNumbers(albumNum, +modal.dataset.modal, modal, modalContainer)
    );

  if (e.target.closest('.video-gallery') === videoGallery)
    videoModals.forEach(modal =>
      matchNumbers(videoNum, +modal.dataset.video, modal, videoContainer)
    );
}

/* ////////////////////////////////////// */
// Making Modal Close
/* ////////////////////////////////////// */

function displayNone(element, arr) {
  element.classList.add('nodisplay');
  arr.forEach(el => el.classList.add('nodisplay'));
}

const stopScroll = el => el.classList.remove('nooverflow');

// Click the X on each modal to close the modal.
function xClosesModal() {
  // Stop scrolling when modal open
  stopScroll(container);
  // For album art
  displayNone(modalContainer, modals);
  // For YouTube video
  displayNone(videoContainer, videoModals);
  // Pause YouTube video
  youtubeVid.forEach(vid =>
    vid.contentWindow.postMessage(
      '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
      '*'
    )
  );
}

// Click outside of modal body (the faded part) to exit modal as well as click the X.
function overlayClosesModal(e) {
  if (e.target === this) {
    stopScroll(container);
    displayNone(this, modals);
  }
}

// Event Handlers
navLinks.forEach(link => link.addEventListener('click', scrollToElement));
albumArtwork.forEach(artwork =>
  artwork.addEventListener('click', openAlbumModal)
);
videoArtwork.forEach(video => {
  video.addEventListener('click', openAlbumModal);
});
modalContainer.addEventListener('click', overlayClosesModal);
videoContainer.addEventListener('click', overlayClosesModal);
closeModal.forEach(close => close.addEventListener('click', xClosesModal));
