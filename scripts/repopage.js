function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

fetch("/repo-footer.htm").then(function (response) {
    response.text().then(function (text) {
        document.getElementById("footer").innerHTML = text;
        document.querySelectorAll(".repo-name").forEach(el => {
            el.innerHTML = document.title.split('|')[0];
        });
    });
});

include("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
include("/scripts/navlinks.js");
include("/scripts/readme.js");
include("/scripts/themeToggle.js");