'use strict';

const navLinks = document.querySelectorAll('.link-scroll');

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
  const scrollTo = elementPosition + window.pageYOffset;

  // If href on anchor is not just # but also starts with # (which is also how you select ID's) and then scrolls to the specified location calculated by scrollTo, with a 'smooth' behaviour.
  if (href !== '#' && href.startsWith('#')) {
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  }
}

navLinks.forEach(link => link.addEventListener('click', scrollToElement));

////////////
/* Footer dropdown */
///////////

const footerLinks = document.querySelectorAll('.link-open');
const footerDrop = document.querySelectorAll('.footer-drop');
const privacy = document.querySelector('.privacy-policy');

function closeOpenDrop() {
  footerDrop.forEach(link => {
    if (!link.classList.contains('hidden')) {
      link.classList.add('hidden');
    }
  });
  return;
}

function openLink(e) {
  e.preventDefault();

  closeOpenDrop();

  const href = this.getAttribute('href');

  const element = document.querySelector(href);

  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }

  const elementPosition = element.getBoundingClientRect().top;

  const scrollTo = elementPosition + window.pageYOffset;

  if (href !== '#' && href.startsWith('#')) {
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  }

  const closeFooterBtn = document.querySelectorAll('.close-foooter');

  const windowTop = window.pageYOffset;

  closeFooterBtn.forEach(btn =>
    btn.addEventListener('click', function (e) {
      element.classList.add('hidden');
      window.scrollTo({
        top: windowTop,
        behavior: 'smooth',
      });
    })
  );

  const backToTopBtn = document.querySelector('.back-to-top');

  backToTopBtn.addEventListener('click', function () {
    element.classList.add('hidden');
  });
}

footerLinks.forEach(link => link.addEventListener('click', openLink));
