"use strict";

const header = document.querySelector('header');
const menus = document.querySelector('.menus');
const sliders = document.querySelectorAll(".slide");
const slidercontentEL=document.querySelectorAll(".slider-content");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

window.addEventListener('scroll',()=>{
    if(document.documentElement.scrollTop > 20){
        menus.classList.add('sticky');
    }
    else{
        menus.classList.remove('sticky');
    }
})

let activeSlide = 0; // Start from the first slide (index 0)

function setBgBody() {
    header.style.backgroundImage = sliders[activeSlide].style.backgroundImage;
}

setBgBody();

function setActiveSlide() {
    sliders.forEach((slide) => slide.classList.remove("active"));
    sliders[activeSlide].classList.add("active");
}

//set content
function setcontent(){
    slidercontentEL.forEach((sliderscontents)=>{
        sliderscontents.classList.remove("active")
    })
    slidercontentEL[activeSlide].classList.add("active");
}

rightBtn.addEventListener('click', () => {
    nextSlide();
    setBgBody();
    setActiveSlide();
    setcontent();
});
leftBtn.addEventListener('click', () => {
    prevslide();
    setBgBody();
    setActiveSlide();
    setcontent();
});

function nextSlide(){
    activeSlide++;
    if (activeSlide > sliders.length - 1) {
        activeSlide = 0;
    }
}
function prevslide(){
    activeSlide--;
    if (activeSlide < 0) {
        activeSlide = sliders.length -1;
    }
}

setInterval(()=>{
    nextSlide();
    setBgBody();
    setActiveSlide();
    setcontent();
},7000)