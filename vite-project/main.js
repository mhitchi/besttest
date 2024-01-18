import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import "./animate.scss";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);




const stickySections = [...document.querySelectorAll('.sticky_wrap')]

const scrollContents = [...document.querySelectorAll('.scroll_contents')]

const observer = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      entry.target.classList.add('animation');


    } else {
      if (entry.target.classList.contains('animation')) {
        entry.target.classList.remove('animation');
      }
    }
  });

 
});

scrollContents.forEach(section => {
  observer.observe(section);
})


//orange pink yellow black
window.addEventListener('scroll', (e) => {
  // document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  // console.log("scrolling")
  const el = document.querySelector("#spinCube");
  gsap.fromTo(el, { rotation: 0 }, { rotation: 0, duration: 10, scrollTrigger: {
      trigger: el
  } })
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
  
  //move horizontally depending on vertical scroll depth
  scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`
  
  
  // document.querySelector(".insta").style.animation = "rainbow01 20s 1";
  // document.querySelector(".email").style.animation = "rainbow02 20s 1";
  // //change svg color
  
  document.querySelectorAll(".icon").forEach (svg => {
    // console.log(svg)
    // if(svg.classList.contains("paused")) {
    //   svg.classList.remove = "paused";
    //   svg.classList.add = "running";
    // }
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

  // for(let i = 0; i>svgArr.length; i++) {
  //   console.log(svgArr[i].style.fill)
  // }
}

//stop if not scrolling
window.addEventListener('scrollend', (e) => {
  document.querySelectorAll(".icon").forEach (svg => {
    svg.classList.add = "paused"; 
    svg.classList.remove = "running";
  })
})


const colorTxt = [...document.querySelectorAll('.color-text')]
const colorArr = ["#009c73", "#2b93d1", "#ffd800", "#e65925","#edaac6"]


for (let i = 0; i< colorTxt.length; i++) {
  var rand = colorArr[(Math.random() * colorArr.length) | 0]
  colorTxt[i].style.color = rand
}


//scrolltrigger
//add event listener for scroll
//document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight))
//set position var
//add click handler to go to set position 0,0
//add animation to speed up while scrolling
//when enter .green.orange.yellow.blue, set animation-duration: 6s;


ScrollTrigger.create({
  trigger: ".green",
  start: "top top",
  endTrigger: ".yellow",
  end: "bottom 50%+=100px",
  onToggle: (self) => {
    console.log("toggled, isActive:", self.isActive),
    document.querySelector(".cube-spinner").style.animationDuration = "6s"
  },
  onUpdate: (self) => {
    console.log(
      "progress:",
      self.progress.toFixed(3),
      "direction:",
      self.direction,
      "velocity",
      self.getVelocity()
    );
  },
});