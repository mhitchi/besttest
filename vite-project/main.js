import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import "./animate.scss";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const stickySections = [...document.querySelectorAll('.sticky_wrap')]
const scrollContents = [...document.querySelectorAll('.scroll_contents')]


window.addEventListener('scroll', (e) => {
  //create loop to apply transform to all sticky sections
  for(let i = 0; i < stickySections.length; i++){
    transform(stickySections[i])
  }
})

function transform(section) {

  const offsetTop = section.parentElement.offsetTop;

  const scrollSection = section.querySelector('.horizontal_scroll')

  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;

  percentage = percentage < 0 ? 0 : percentage > 300 ? 300 : percentage;
  // note: 130-210 = scenario/orange
  console.log(percentage)
  
  //move horizontally depending on vertical scroll depth
  let wheelTime = false;

  // if (percentage==187) {
  //   wheelTime = true
  // } else if (percentage !== 187) {
  //   scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`
  // }
  scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`
  
  // // troubleshooting safari
  // scrollSection.style.webkitTransform = `-webkit-translate3d(${-(percentage)}vw, 0, 0); `
  

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
  const wheelArr = [...document.querySelectorAll(".wheel-child")];
  wheelArr.forEach(item => {
    item.style.animationName = "wheel"
    //animationname applied and consolelogging
  })
  

})

const colorTxt = [...document.querySelectorAll('.color-text')]
const colorArr = ["#009c73", "#2b93d1", "#ffd800", "#e65925","#edaac6"]


for (let i = 0; i< colorTxt.length; i++) {
  var rand = colorArr[(Math.random() * colorArr.length) | 0]
  colorTxt[i].style.color = rand
}


// //trying to simplify scrolltrigger
// gsap.set('.wheel', { position: 'absolute' });


// gsap.to('.wheel', {
//   yPercent: 50,
//   rotation: "-=40_ccw",
//   opacity: 0,
//   transformOrigin: "0% 100%",
//   stagger: 0.25,
//   scrollTrigger: {
    
//     trigger: '.wheel-child',
//     // threshold: 0.5, // target 'section' should be 20% visible,
    
//     markers: true,
//     scrub: true,
//     start: window.innerHeight,
//     end: "+=800px",
//     pin: true,
//   }
// })

//trying to simplify scrolltrigger

// gsap.set('.wheel', { position: 'absolute' });


gsap.to('.wheel', {
  // y: window.innerHeight/4,
  // x: window.innerWidth/5,
  rotation: "-=40_ccw",
  // top: window.innerHeight/2,
  // left: window.innerWidth*2.3,
  opacity: 1,
  transformOrigin: "0% 100%",
  // stagger: .75,
  scrollTrigger: {
    
    trigger: '.wheel',
    // threshold: 0.5, // target 'section' should be 20% visible,
    
    markers: true,
    scrub: true,
    start: window.innerHeight*1.25,
    end: "+=1200px",
    pin: true,
  }
})
