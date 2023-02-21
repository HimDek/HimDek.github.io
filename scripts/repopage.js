function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true; 
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include("/scripts/header.js");
include("/scripts/footer.js");
include("/scripts/navlinks.js");
include("/scripts/readme.js");
include("/scripts/themeToggle.js");