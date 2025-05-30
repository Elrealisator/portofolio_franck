
// ---------------skill progress animation-------------

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");





window.addEventListener("scroll", () => {
    if(!skillsPlayed) skillsCounter();

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

let skillsPlayed = false;


function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    // console.log(topPosition);
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;{
        // console.log();
        return false;
    }
}

function skillsCounter() {
    if(!hasReached(first_skill)) return;
    skillsCounter = true;
   
    sk_counters.forEach((counter, i) =>{
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);
        progress_bars[i].style.setProperty("--target", strokeValue);
        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });
    
    progress_bars.forEach( (P) => (P.style.animation = "progress 2s ease-in-out forwards")
    );
 

}





