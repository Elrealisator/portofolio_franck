
const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");




window.addEventListener("scroll", () => {
    if(!mlPlayed) mlCounters();
    activeLink();
  

})






function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
    .map((sct, i) => {
        return{
          y: sct.getBoundingClientRect().top - header.offsetHeight,
          id: i,
        };
    })
    .filter((sct) => sct.y <= 0);
    let currSectionID = passedSections.at(-1).id;


    links.forEach((l) => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();

let firstTheme = localStorage.getItem("dark");
console.log(+firstTheme);

function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark", 1);
    }else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
}

toggle_btn.addEventListener("click", () => {
changeTheme(!document.body.classList.contains("dark"));
});

// --------------------open and close navbar-----------------------------



















// ---------------services counter animation-------------

const ml_section  = document.querySelector(".milestones");
const ml_counters  = document.querySelectorAll(".number span");



const prt_section  = document.querySelector(".portofolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay  = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");

const prev_btn  = document.querySelector(".prev-btn");
const next_btn  = document.querySelector(".next-btn");







prev_btn.addEventListener("click", () => {
    if(currentIndex == 0){
        currentIndex = 5;
    }else{
 currentIndex--;
}
 changeImage(currentIndex);
})
next_btn.addEventListener("click", () => {
    if(currentIndex == 5){
        currentIndex = 0;
    }else{
 currentIndex++;
}
 changeImage(currentIndex);
})

function updateCount(num, maxNum){
    let currentNum = +num.innerText;

    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() =>{
            updateCount(num, maxNum);
        }, 12);
    }
}


let mlPlayed = false;

function mlCounters() {
    if(!hasReached(ml_section)) return; 
    let mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;
        

        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);
    });
}

// ---------------portofolio filter mixer animation-------------

// CommonJS

let  mixer = mixitup(".portofolio-gallery",  {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500
    }
});


// ---------------modal pop up animation-------------

let currentIndex = 0;

zoom_icons.forEach((icn, i) => 
icn.addEventListener("click", () =>{
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
})
);

modal_overlay.addEventListener("click", () => {
prt_section.classList.remove("open")
document.body.classList.add("stopScrolling");

});
function changeImage(index) {
 images.forEach(img => img.classList.remove("showImage"));
 images[index].classList.add("showImage");
}






















