'use strict'

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileSlideMenu = document.getElementById("mobile-slide-menu");
const mobileMenuClose = document.getElementById("mobile-menu-close");

// Open mobile menu on hamburger click
mobileMenuBtn.addEventListener("click", () => {
  mobileSlideMenu.classList.add("active");
});

// Close mobile menu on close button click
mobileMenuClose.addEventListener("click", () => {
  mobileSlideMenu.classList.remove("active");
});

// Close menu when clicking on a link (optional but user friendly)
function closeMobileMenu() {
  mobileSlideMenu.classList.remove("active");
}
