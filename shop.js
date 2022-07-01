'use strict';

const navLinks = document.querySelectorAll('.link-scroll');
const footerLinks = document.querySelectorAll('.link-open');
const footerDrop = document.querySelectorAll('.footer-drop');
const privacy = document.querySelector('.privacy-policy');

function scrollToElement(e) {
  e.preventDefault();

  const href = this.getAttribute('href');

  if (href === '#') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  const element = document.querySelector(href);
  const elementPosition = element.getBoundingClientRect().top;
  const scrollTo = elementPosition + window.pageYOffset;

  if (href !== '#' && href.startsWith('#')) {
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  }
}

navLinks.forEach(link => link.addEventListener('click', scrollToElement));

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
    btn.addEventListener('click', function () {
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
