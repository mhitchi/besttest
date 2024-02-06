import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import "./animate.scss";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

//hybrid scroll
const scrollContents = document.querySelector(".scroll_contents");
console.log("offset width: " + scrollContents.offsetWidth)

function getScrollAmount() {
	let scrollContentsWidth = scrollContents.scrollWidth;
  console.log("scroll contents width: " + scrollContentsWidth)
  console.log(-(scrollContentsWidth - window.innerWidth))
	return -(scrollContentsWidth - window.innerWidth);
}

const tween = gsap.to(scrollContents, {
	x: getScrollAmount,
	duration: 3,
	ease: "none",
});


ScrollTrigger.create({
	trigger:".scroll_wrapper",
	start:"top 0%",
	end: () => `+=${getScrollAmount() * -1}`,
	pin:true,
	animation:tween,
	scrub:1,
	invalidateOnRefresh:true,
	markers:true
})
//end hybrid scroll

//simplified scrolltrigger

gsap.set('.wheel-child', { position: 'absolute' });

gsap.to('.wheel-child', {
  yPercent: -10,
  stagger: 0.5,
  scrollTrigger: {
    trigger: '.wheel-child',
    markers: true,
    start: window.innerHeight*1.25,
    end: "+=600px",
    scrub: true,
    pin: true
  }
})

const stickySections = [...document.querySelectorAll('.sticky_wrap')]
// const scrollContents = [...document.querySelectorAll('.scroll_contents')]


window.addEventListener('scroll', (e) => {
  //create loop to apply transform to all sticky sections
  for(let i = 0; i < stickySections.length; i++){
    transform(stickySections[i])
  }
})

function transform(section) {

  const offsetTop = section.parentElement.offsetTop;

 // const scrollSection = section.querySelector('.horizontal_scroll')

  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;

  percentage = percentage < 0 ? 0 : percentage > 300 ? 300 : percentage;
  // note: 130-210 = scenario/orange
  
  //move horizontally depending on vertical scroll depth
  //scrollSection.style.transform = `translateX(${-(percentage)}vw)`
  
  // // troubleshooting safari
  
  // //change svg color
  document.querySelectorAll(".icon").forEach (svg => {

    const navColor = document.querySelector(".nav")
    if (percentage < 10 ) {
      svg.style.fill = "#000";
      navColor.style.backgroundColor = "rgb(43,147,209,0)"
    } else if (percentage >= 10 && percentage < 100) {
      svg.style.fill = "#e65925";
      navColor.style.backgroundColor = "rgb(43,147,209,0)"
    } else if (percentage >= 100 && percentage < 200) {
      svg.style.fill = "#edaac6";
      navColor.style.backgroundColor = "rgb(43,147,209,0)"
    } else if (percentage >= 200 && percentage <= 300) {
      svg.style.fill = "#ffd800";
      
    } 
    if (percentage >=290 && percentage <=300) {
      navColor.style.backgroundColor = "rgb(43,147,209,1)"
    } else if (percentage < 290) {
      navColor.style.backgroundColor = "rgb(43,147,209,0)"
    }
    svg.style.transform ="ease"
  })

}

//spin faster if scrolling
window.addEventListener('scroll', (e) => {
  document.querySelector(".cube-spinner").style.animationName = "spincube"
  // const wheelArr = [...document.querySelectorAll(".wheel-child")];
  // wheelArr.forEach(item => {
  //   item.style.animationName = "wheel"
  //   //animationname applied and consolelogging
  // })
  

})

const colorTxt = [...document.querySelectorAll('.color-text')]
const colorArr = ["#009c73", "#2b93d1", "#ffd800", "#e65925","#edaac6"]


for (let i = 0; i< colorTxt.length; i++) {
  var rand = colorArr[(Math.random() * colorArr.length) | 0]
  colorTxt[i].style.color = rand
}

//place images randomly on page within legible areas
//get array of image elements
const productImgArr = [...document.querySelectorAll(".product")]

//get array of src files
const imgFilesArr = ["./assets/img/AnotherChairSketch02.png", "./assets/img/BeamChair.png", "./assets/img/BeamChairSketch.png", "./assets/img/CardboardChair.png", "./assets/img/CHA3R.png", "./assets/img/CHA1R.png", "./assets/img/CHA4R.png", "./assets/img/CHA5R.png", "./assets/img/foldingChairIcon.png", "./assets/img/greenSpinCube.png", "./assets/img/StoolSketch.png", "./assets/img/MODE1.png", "./assets/img/Scan 2 copy.png", "./assets/img/chairIcon.png", "./assets/img/foldingChairIcon.png", "./assets/img/coffeeIcon.png"]



function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

shuffle(imgFilesArr);

//for each image, apply random src
//for each image, apply random coordinates

for ( let i = 0; i < productImgArr.length; i++ ) {
    productImgArr[i].src= imgFilesArr[i]
}