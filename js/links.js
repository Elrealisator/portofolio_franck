
const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");
const hamburger = document.querySelectorAll(".hambuger");



window.addEventListener("scroll", () => {
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



hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopscrolling");
});

links.forEach((link) => 
link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopscrolling");
})
);