function Menu(icon) {
    var x = document.getElementById("nav");
    if (x.className === "nav") {
        x.classList.add("responsive");
    } else {
        x.className = "nav";
    }
}

class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}

function clicknav(id) {

}

document.querySelectorAll(".nav-link").forEach(el => {
    classWatcher = new ClassWatcher(el, 'active', () => activated(el), () => deactivated())
})

function activated(el) {
    setTimeout(() => {
        document.getElementById("activetab").classList.add("slide-out-in-left");
    }, 300)
    setTimeout(() => {
        document.getElementById("activetab").innerHTML = el.innerHTML;
    }, 600)
    setTimeout(() => {
        document.getElementById("activetab").classList.remove("slide-out-in-left")
    }, 800)
}

function deactivated() {
    setTimeout(() => {
        document.getElementById("activetab").classList.add("slide-out-in-left");
    }, 300)
    setTimeout(() => {
        document.getElementById("activetab").innerHTML = "";
    }, 500)
    setTimeout(() => {
        document.getElementById("activetab").classList.remove("slide-out-in-left")
    }, 800)
}