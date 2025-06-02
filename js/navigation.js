

const hamburger = document.querySelectorAll(".hambuger");


hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});

links.forEach(link => 
    link.addEventListener("click", () => {  
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
}));
