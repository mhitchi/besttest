
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
  console.log(percentage)
  
  // document.querySelector(".insta").style.animation = "rainbow01 20s 1";
  // document.querySelector(".email").style.animation = "rainbow02 20s 1";
  // //change svg color
  
  document.querySelectorAll(".icon").forEach (svg => {
    // console.log(svg)
    // if(svg.classList.contains("paused")) {
    //   svg.classList.remove = "paused";
    //   svg.classList.add = "running";
    // }
    if (percentage < 10 ) {
      svg.style.fill = "#000"
    } else if (percentage >= 10 && percentage < 100) {
      svg.style.fill = "#e65925"
    } else if (percentage >= 100 && percentage < 200) {
      svg.style.fill = "#edaac6"
    } else if (percentage >= 200 && percentage <= 300) {
      svg.style.fill = "#ffd800"
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


