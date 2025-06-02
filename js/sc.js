const header = document.querySelector("header");



/* -------------Sticky Navbar----------- */

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
    const links = document.querySelectorAll(".nav-link");

};
stickyNavbar();

window.addEventListener("scroll", stickyNavbar);









