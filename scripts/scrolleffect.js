; (function () {
    var throttle = function (type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function () {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function () {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("scroll", "optimizedScroll");
})();

window.addEventListener("optimizedScroll", () => {
    var exittopleft = document.querySelectorAll('.exit-left.exit-top:not(.scale-exit)'),
        exittopright = document.querySelectorAll('.exit-right.exit-top:not(.scale-exit)'),
        scaleexittopleft = document.querySelectorAll('.exit-left.exit-top.scale-exit'),
        scaleexittopright = document.querySelectorAll('.exit-right.exit-top.scale-exit'),
        exitleft = document.querySelectorAll('.exit-left:not(.scale-exit):not(.exit-top)'),
        exitright = document.querySelectorAll('.exit-right:not(.scale-exit):not(.exit-top)'),
        scaleexitleft = document.querySelectorAll('.exit-left.scale-exit:not(.exit-top)'),
        scaleexitright = document.querySelectorAll('.exit-right.scale-exit:not(.exit-top)'),
        enterleft = document.querySelectorAll('.enter-left:not(.scale-enter)'),
        enterright = document.querySelectorAll('.enter-right:not(.scale-enter)'),
        scaleenterleft = document.querySelectorAll('.enter-left.scale-enter'),
        scaleenterright = document.querySelectorAll('.enter-right.scale-enter');

    scaleexittopleft.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        height = parseInt(window.getComputedStyle(el).height.slice(0, -2))
        el.style.transform = "translateX(-" + 0.5 * offset + "px) scale(" + height / (offset + height) + ")"
    })
    scaleexittopright.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        height = parseInt(window.getComputedStyle(el).height.slice(0, -2))
        el.style.transform = "translateX(" + 0.5 * offset + "px) scale(" + height / (offset + height) + ")"
    })
    exittopleft.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        el.style.transform = "translateX(-" + 0.5 * offset + "px)"
    })
    exittopright.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        el.style.transform = "translateX(" + 0.5 * offset + "px)"
    })

    scaleexitleft.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        height = parseInt(window.getComputedStyle(el).height.slice(0, -2))
        el.style.transform = "translate(-" + 0.5 * offset + "px," + offset + "px) scale(" + height / (offset + height) + ")"
    })
    scaleexitright.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        height = parseInt(window.getComputedStyle(el).height.slice(0, -2))
        el.style.transform = "translate(" + 0.5 * offset + "px," + offset + "px) scale(" + height / (offset + height) + ")"
    })
    exitleft.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        el.style.transform = "translate(-" + 0.5 * offset + "px," + offset + "px)"
    })
    exitright.forEach(el => {
        offset = el.parentElement.getBoundingClientRect().top.toFixed() < 0 ? -1 * el.parentElement.getBoundingClientRect().top.toFixed() : 0
        el.style.transform = "translate(" + 0.5 * offset + "px," + offset + "px)"
    })
    scaleenterleft.forEach(el => {
        height = parseInt(window.getComputedStyle(el).height.slice(0, -2))
        parentHeight = parseInt(window.getComputedStyle(el.parentElement).height.slice(0, -2))
        if (el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight > 0) {
            offset = el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight
            el.style.transform = "translateX(-" + 0.5 * offset + "px) scale(" + height / (offset + height) + ")"
        }
    })
    scaleenterright.forEach(el => {
        height = parseInt(window.getComputedStyle(el).height.slice(0, -2))
        parentHeight = parseInt(window.getComputedStyle(el.parentElement).height.slice(0, -2))
        if (el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight > 0) {
            offset = el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight
            el.style.transform = "translateX(" + 0.5 * offset + "px) scale(" + height * 100000 / (offset + height) + ")"
        }
    })
    enterleft.forEach(el => {
        parentHeight = parseInt(window.getComputedStyle(el.parentElement).height.slice(0, -2))
        if (el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight > 0) {
            offset = el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight
            el.style.transform = "translateX(-" + 0.5 * offset + "px)"
        }
    })
    enterright.forEach(el => {
        parentHeight = parseInt(window.getComputedStyle(el.parentElement).height.slice(0, -2))
        if (el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight > 0) {
            offset = el.parentElement.getBoundingClientRect().top.toFixed() - window.innerHeight + parentHeight
            el.style.transform = "translateX(" + 0.5 * offset + "px)"
        }
    })
})

window.addEventListener('scroll', (e) =>
    document.querySelectorAll('.horizontal-scroll-sticky-wrap').forEach(el =>
        horizontalScrollTransform(el)
    )
)

function horizontalScrollTransform(section) {
    offset = window.scrollY - section.parentElement.offsetTop;

    const horizontalScrollSection = section.querySelector('.horizontal-scroll-section')
    horizontalScrollSectionWidth = parseInt(window.getComputedStyle(horizontalScrollSection).width.slice(0, -2))

    horizontalScrollSection.parentElement.parentElement.style.height = horizontalScrollSectionWidth + window.innerWidth + "px"

    offset = offset < 0 ? 0 : offset > horizontalScrollSectionWidth - window.innerWidth ? horizontalScrollSectionWidth - window.innerWidth : offset;

    horizontalScrollSection.style.transform = `translate3d(${-(offset)}px, 0, 0)`
}

window.onscroll = function (ev) {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        document.querySelectorAll("expand-on-bottom-hit").forEach(el => { el.classList.add("expanded") })
    }
};