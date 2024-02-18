function include(url, callback = () => { }) {
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
}

loadedScriptCount = 0
observeanimationLoaded = false

function scriptLoaded() {
    if (observeanimationLoaded) {
        observeanimation()
    }
}

function markedLoaded() {
    fetch("./README.md").then(function (response) {
        response.text().then(function (text) {
            document.getElementById("readme").innerHTML = marked.parse(text);
        });
    });
    scriptLoaded()
}

function navlinksLoaded() {
    include("/scripts/themeToggle.js", scriptLoaded);
}

include("https://cdn.jsdelivr.net/npm/marked/marked.min.js", markedLoaded);
include("/scripts/observeanimation.js", () => observeanimationLoaded = true);
include("/scripts/navlinks.js", navlinksLoaded);
include("/scripts/scrolleffect.js");

fetch("/repo-footer.htm").then(function (response) {
    response.text().then(function (text) {
        document.getElementById("footer").innerHTML = text;
        document.querySelectorAll(".repo-name").forEach(el => {
            el.innerHTML = document.title.split('|')[0];
        });
        scriptLoaded()
    });
});