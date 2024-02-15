function include(url, callback = null) {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

loadedScriptCount = 0

include("./scripts/themeToggle.js", scriptLoaded);
include("./scripts/navbar.js", scriptLoaded);
include("./scripts/observeanimation.js", scriptLoaded);
// include("./scripts/hybridscroll.js", scriptLoaded);

function scriptLoaded() {
  loadedScriptCount++

  if (loadedScriptCount == 3) {
    execute()
  }
}

function execute() {

  const loaded = new Event("loaded");

  document.addEventListener("loaded", hasloaded, false);
  function hasloaded(e) {
    observeanimation()
    window.setTimeout(() => {
      document.querySelectorAll('.card').forEach(el => {
        el.classList.add("container-sm")
        el.classList.add("my-3")
        el.classList.add("my-sm-4")
        el.classList.add("my-md-5")
        el.classList.add("p-1")
        el.classList.add("p-sm-2")
        el.classList.add("p-md-3")
        el.classList.add("rounded-5")
        el.classList.add("border-0")
        el.classList.add("bg-primary-subtle")
      });
    }, 1000)
  }

  fetch("https://raw.githubusercontent.com/HimDek/HimDek/main/README.md").then(function (response) {
    response.text().then(function (text) {
      document.getElementById("readme").innerHTML = marked.parse(text);
      document.dispatchEvent(loaded);
    });
  });

  listrepos("HimDek", document.getElementById("repos-container")).then(reposcount => {
    document.getElementById("repos").innerHTML = document.getElementById("repos").innerHTML + " <span class='badge rounded-pill bg-secondary'>" + reposcount.toString() + "</span>"
    document.dispatchEvent(loaded)

  });

  listgists("HimDek", document.getElementById("gists-container")).then(gistscount => {
    document.getElementById("gists").innerHTML = document.getElementById("gists").innerHTML + " <span class='badge rounded-pill bg-secondary'>" + gistscount.toString() + "</span>"
    document.dispatchEvent(loaded)
  });

}