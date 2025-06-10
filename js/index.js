const hamburger = document.querySelector(".hamburger");
const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");

const ml_section  = document.querySelector(".milestones");
const ml_counters  = document.querySelectorAll(".number span");

const prt_section  = document.querySelector(".portofolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay  = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");

const prev_btn  = document.querySelector(".prev-btn");
const next_btn  = document.querySelector(".next-btn");

let currentIndex = 0;
let mlPlayed = false;

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});

// Close menu on nav link click
links.forEach(link => 
    link.addEventListener("click", () => {  
        document.body.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    })
);

// Scroll event
window.addEventListener("scroll", () => {
    if(!mlPlayed) mlCounters();
    activeLink();
});
// Active nav link based on scroll position
function activeLink() {
    const header = document.querySelector("header");
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
        .map((sct, i) => {
            return{
                y: sct.getBoundingClientRect().top - header.offsetHeight,
                id: i,
            };
        })
        .filter((sct) => sct.y <= 0);
    if(passedSections.length === 0) return;
    let currSectionID = passedSections.at(-1).id;

    links.forEach((l) => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();

// Theme toggle and save preference
let firstTheme = localStorage.getItem("dark");
changeTheme(firstTheme === '1');

function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark", 1);
    } else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
}

toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
});

// Services counter animation
function updateCount(num, maxNum){
    let currentNum = +num.innerText;

    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() =>{
            updateCount(num, maxNum);
        }, 12);
    }
}

function hasReached(element){
    const topPosition = element.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + element.offsetHeight;
}

function mlCounters() {
    if(!hasReached(ml_section)) return; 
    mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;
        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);
    });
}

// Portfolio filter (using mixitup library)
let mixer = mixitup(".portofolio-gallery",  {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500
    }
});

// Modal popup for portfolio images
zoom_icons.forEach((icn, i) => 
    icn.addEventListener("click", () =>{
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        changeImage(currentIndex);
    })
);

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
});

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

// Previous and next buttons for portfolio images
prev_btn.addEventListener("click", () => {
    if(currentIndex === 0){
        currentIndex = images.length - 1;
    } else {
        currentIndex--;
    }
    changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if(currentIndex === images.length - 1){
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    changeImage(currentIndex);
});