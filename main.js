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
include("./scripts/scrolleffect.js", scriptLoaded);
include("./scripts/gitlist.js", scriptLoaded);
// include("./scripts/hybridscroll.js", scriptLoaded);

function scriptLoaded() {
  loadedScriptCount++

  if (loadedScriptCount == 5) {
    observeanimation()
    execute()
  }
}

function execute() {

  const loaded = new Event("loaded");

  document.addEventListener("loaded", hasloaded, false);
  function hasloaded(e) {
    observeanimation()
  }

  fetch("https://api.github.com/users/HimDek").then(res => res.json()).then((out) => {
    document.querySelectorAll('.my-address').forEach(el => el.innerHTML = out.location)
    document.querySelectorAll('.github-followers-count').forEach(el => el.innerHTML = out.followers)
    document.querySelectorAll('.repos-count').forEach(el => el.innerHTML = out.public_repos)
    document.querySelectorAll('.gists-count').forEach(el => el.innerHTML = out.public_gists)
  });

  fetch("https://api.github.com/search/issues?q=is:pr+author:HimDek+is:merged").then(res => res.json()).then((out) => {
    document.querySelectorAll('.github-merged-pr-count').forEach(el => el.innerHTML = out.total_count)
  });

  fetch("https://api.github.com/search/commits?q=author:HimDek").then(res => res.json()).then((out) => {
    document.querySelectorAll('.github-commits-count').forEach(el => el.innerHTML = out.total_count)
  });

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