
const stickySections = [...document.querySelectorAll('.sticky_wrap')]


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
  document.querySelector(".insta").style.animation = "rainbow01 12s infinite";
  document.querySelector(".email").style.animation = "rainbow02 12s infinite";
  // //change svg color
  
  document.querySelectorAll(".icon").forEach (svg => {
    console.log(svg)
    svg.style.transform ="ease"
  })

  // for(let i = 0; i>svgArr.length; i++) {
  //   console.log(svgArr[i].style.fill)
  // }
}

