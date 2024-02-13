function include(file) {
  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true; 
  document.getElementsByTagName('head').item(0).appendChild(script);
}

include("./scripts/themeToggle.js");
include("./scripts/navbar.js");

fetch("https://raw.githubusercontent.com/HimDek/HimDek/main/README.md").then(function(response) {
  response.text().then(function(text) {
      document.getElementById("readme").innerHTML = marked.parse(text);
      const typing = document.querySelectorAll('.typing');
      typing.forEach(el => typingobserver.observe(el));
  });
});

const typingobserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('typing-demo');
      }
      else {
          entry.target.classList.remove('typing-demo');
      }
  });
});