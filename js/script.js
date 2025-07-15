

const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:firstchild");
const counters = document.querySelector(".counter span");
const progrees_bars = document.querySelector(".skills svg circle");

window.addEventListener("scroll", () => {
    if(!skillsPlayed) skillsCounter();

})



function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageY0ffset > 0);
    //  
};

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);


// ---------------reveal animation-------------

let sr =ScrollReveal({
    duration: 2500,
    distance: "60px",
});


sr.reveal(".showcase-info", {delay: 600 });
sr.reveal(".showcase-image", {origin: top, delay: 700 });



function hasRecheach(el){
    let topPosition = el.getBoundingClientRect().top;
    // console.log(topPosition);
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;{
        // console.log();
        return false;
}
// ---------------skill progress animation-------------

function updateCount(num, Maxnum){
    let currentNum = +num.innerText;
    if(currentNum < maxnum){
        num.innerText = currentNum + 1;
        setTimeout(() =>{
            updateCount(num, Maxnum);
        },12);
    }
}

let skillsPlayed = false;


function skillcounter(){
    if(!hasRecheach(first_skill)) return;
    skillsPlayed = true;
    // console.log(hasRecheach(first_skill));
    // console.log("you res eracheach");
    sk_counters.forEach((counter, i) =>{
        let target = +counter.dataset.target;
        // console.log(typeof target);
        let strokeValue = 427 - 427 *(target/100);
        // console.log(strokeValue);
        progrees_bars[i].style.setProperty("--target", strokeValue);


        setTimeout(() =>{
            updateCount(counter, target);
        }, 400);
    });


    progrees_bars.forEach( (P) => (P.style.animation = "progress 0s ease-in-out"))
    ; 
}}