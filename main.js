function include(url, callback = () => { }) {
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
observeanimationLoaded = false

function scriptLoaded() {
  if (observeanimationLoaded) {
      observeanimation()
  }
}

function gitlistLoaded() {
  listrepos("HimDek", document.getElementById("repos-container")).then(reposcount => {
    document.getElementById("repos").innerHTML = document.getElementById("repos").innerHTML + " <span class='badge rounded-pill bg-secondary'>" + reposcount.toString() + "</span>"
    scriptLoaded()
  });

  listgists("HimDek", document.getElementById("gists-container")).then(gistscount => {
    document.getElementById("gists").innerHTML = document.getElementById("gists").innerHTML + " <span class='badge rounded-pill bg-secondary'>" + gistscount.toString() + "</span>"
    scriptLoaded()
  });
}

include("/scripts/gitlist.js", gitlistLoaded);
include("/scripts/themeToggle.js", scriptLoaded);
include("/scripts/observeanimation.js", () => observeanimationLoaded = true);
include("/scripts/scrolleffect.js");
include("/scripts/navbar.js");

fetch("https://api.github.com/users/HimDek").then(res => res.json()).then((out) => {
  document.querySelectorAll('.my-address').forEach(el => el.innerHTML = out.location)
  document.querySelectorAll('.github-followers-count').forEach(el => el.innerHTML = out.followers)
  document.querySelectorAll('.repos-count').forEach(el => el.innerHTML = out.public_repos)
  document.querySelectorAll('.gists-count').forEach(el => el.innerHTML = out.public_gists)
  scriptLoaded()
});

fetch("https://api.github.com/search/issues?q=is:pr+author:HimDek+is:merged").then(res => res.json()).then((out) => {
  document.querySelectorAll('.github-merged-pr-count').forEach(el => el.innerHTML = out.total_count)
  scriptLoaded()
});

fetch("https://api.github.com/search/commits?q=author:HimDek").then(res => res.json()).then((out) => {
  document.querySelectorAll('.github-commits-count').forEach(el => el.innerHTML = out.total_count)
  scriptLoaded()
});