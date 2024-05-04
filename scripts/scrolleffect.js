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
    document.querySelectorAll('.horizontal-scroll-sticky-wrap').forEach(el => {
        horizontalScrollTransform(el)
    })
)

function horizontalScrollTransform(section) {
    offset = -section.parentElement.getBoundingClientRect().top;

    const horizontalScrollSection = section.querySelector('.horizontal-scroll-section')
    const horizontalScrollSectionLeft = section.querySelector('.horizontal-scroll-section-left')
    const horizontalScrollSectionRight = section.querySelector('.horizontal-scroll-section-right')

    if (horizontalScrollSection !== null) {
        horizontalScrollSectionWidth = parseInt(window.getComputedStyle(horizontalScrollSection).width.slice(0, -2))

        section.parentElement.style.height = horizontalScrollSectionWidth - window.innerWidth + window.innerHeight + "px"

        offset = offset < 0 ? 0 : offset > horizontalScrollSectionWidth - window.innerWidth ? horizontalScrollSectionWidth - window.innerWidth : offset;

        horizontalScrollSection.style.transform = `translate3d(${-(offset)}px, 0, 0)`
    }

    if (horizontalScrollSectionLeft != null && horizontalScrollSectionRight != null) {
        horizontalScrollSectionLeftWidth = parseInt(window.getComputedStyle(horizontalScrollSectionLeft).width.slice(0, -2))
        horizontalScrollSectionRightWidth = parseInt(window.getComputedStyle(horizontalScrollSectionRight).width.slice(0, -2))

        section.parentElement.style.height = horizontalScrollSectionLeftWidth + horizontalScrollSectionRightWidth + "px"

        offsetLeft = offset < 0 ? 0 : offset > horizontalScrollSectionLeftWidth + horizontalScrollSectionRightWidth ? horizontalScrollSectionLeftWidth + horizontalScrollSectionRightWidth : offset;
        offsetRight = offset < 0 ? 0 : offset > horizontalScrollSectionLeftWidth + horizontalScrollSectionRightWidth ? horizontalScrollSectionLeftWidth + horizontalScrollSectionRightWidth : offset;

        horizontalScrollSectionLeft.style.transform = `translate3d(${-(offsetLeft)}px, 0, 0)`
        horizontalScrollSectionRight.style.transform = `translate3d(${(offsetRight)}px, 0, 0)`
    }
}

window.onscroll = function (ev) {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        document.querySelectorAll("expand-on-bottom-hit").forEach(el => { el.classList.add("expanded") })
    }
};

const circle = document.getElementById('circle');
const pointer = circle.querySelector("div")

document.addEventListener('mousemove', (e) => moveCircle(e));

document.querySelectorAll(".wobbly-button").forEach(el => {
    el.addEventListener("mouseenter", () => {
        setTimeout(() => {
            el.style.transition = "transform 0s"
            el.style.zIndex = "10000"
        }, 200)
    })
    el.addEventListener("mouseleave", () => {
        el.style.transition = "transform 0.2s"
        el.style.zIndex = ""
    })
})


mousePositionX = 0
mousePositionY = 0

async function moveCircle(e) {
    mousePositionX = e.clientX;
    mousePositionY = e.clientY;

    try {
        let element = e.target.closest(".wobbly-button")
        parent = e.target.closest(".wobbly-button-container")
        parentWidth = window.getComputedStyle(parent).width
        parentHeight = window.getComputedStyle(parent).height

        nx = parent.getBoundingClientRect().left + parseInt(parentWidth.slice(0, -2)) / 2;
        ny = parent.getBoundingClientRect().top + parseInt(parentHeight.slice(0, -2)) / 2;
        distX = (mousePositionX - nx) / 1.5;
        distY = (mousePositionY - ny) / 1.5;
        element.style.transform = "translate(" + distX + "px," + distY + "px)";

        //circle.classList.add("big")
        pointer.style.borderRadius = `${parseInt(parentWidth.slice(0, -2)) < parseInt(parentHeight.slice(0, -2)) ? parseInt(parentWidth.slice(0, -2)) / 2 : parseInt(parentHeight.slice(0, -2)) / 2}px`
        pointer.style.width = `${parseInt(parentWidth.slice(0, -2))}px`
        pointer.style.height = `${parseInt(parentHeight.slice(0, -2))}px`
        pointer.classList.add("big")
    } catch {
        let element = e.target.closest("button, a")
        if (element === null) {
            pointer.style.borderRadius = `50%`
            pointer.style.width = `16px`
            pointer.style.height = `16px`
            pointer.classList.remove("big")
        } else {
            pointer.style.borderRadius = `25px`
            pointer.style.width = `50px`
            pointer.style.height = `50px`
            pointer.classList.add("big")
        }
    }
    const height = parseInt(window.getComputedStyle(circle).height.slice(0, -2));
    const width = parseInt(window.getComputedStyle(circle).width.slice(0, -2));
    circle.style.left = `${mousePositionX - width / 2}px`;
    circle.style.top = `${mousePositionY - height / 2}px`;
}