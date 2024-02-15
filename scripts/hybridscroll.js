function hybridScroll() {
    const stickySections = [...document.querySelectorAll('.sticky-wrap')]
    // console.log(stickySections);

    window.addEventListener('scroll', (e) => {
        for (let i = 0; i < stickySections.length; i++) {
            transform(stickySections[i])
        }
    })
}

function transform(section) {

    // This will get the Y distance from top
    const offsetTop = section.parentElement.offsetTop;
    // console.log(offsetTop);

    // This grabs each scroll section
    const scrollSection = section.querySelector('.horizontal-scroll')
    scrollSectionWidth = parseInt(window.getComputedStyle(scrollSection).width.slice(0, -2)) * 100 / document.documentElement.clientWidth
    parentInnerWidth = section.parentElement.offsetWidth * 100 / document.documentElement.clientWidth
    parentElementHeight = scrollSectionWidth - parentInnerWidth
    section.parentElement.style.height = `${parentElementHeight}vw`

    // This works out the percentage of the screen and converts it to a VW value
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;

    // If it is less than 0, don't transform
    // Else if the percentage is greater than width, remain at width
    // Else transform
    percentage = percentage < 0 ? 0 : percentage > parentElementHeight ? parentElementHeight : percentage;
 
    // Viewport height is then converted to the viewport width
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`
    // You could use translate( vw, 0) here as well
}