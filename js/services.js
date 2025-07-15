// ---------------services counter animation-------------

const ml_section  = document.querySelector(".milestones");
const ml_counters  = document.querySelectorAll(".number span");



const prt_section  = document.querySelector(".portofolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay  = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");

const prev_btn  = document.querySelector(".prev-btn");
const next_btn  = document.querySelector(".next-btn");

const links = document.querySelectorAll('.nav-link');



window.addEventListener("scroll", () => {
    if(!mlPlayed) mlCounters();

})

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






















