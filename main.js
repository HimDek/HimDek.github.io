function include(file) {
  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true; 
  document.getElementsByTagName('head').item(0).appendChild(script);
}

include("./scripts/themeToggle.js");
include("./scripts/header.js");
include("./scripts/footer.js");
include("./scripts/navbar.js");

fetch("https://raw.githubusercontent.com/HimDek/HimDek/main/README.md").then(function(response) {
  response.text().then(function(text) {
      document.getElementById("readme").innerHTML = marked.parse(text);
  });
});