function opentab(evt, tabName) {
    var i, tablinks;

    var tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById("activetab").classList.remove("shown");
    document.getElementById("activetab").innerHTML = document.getElementById(tabName.replace('tab', '')).innerHTML;
    document.getElementById("activetab").addEventListener("transitionend", () => {
        document.getElementById("activetab").classList.add("shown");
    });
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
    window.history.replaceState(null, null, "?tab=" + tabName.replace('tab', ''));
}

const urlParams = new URLSearchParams(window.location.search);
const tab = urlParams.get('tab');
  
document.addEventListener("loaded", hasloaded, false);

function hasloaded(e) {
    document.getElementById('home').click();
    document.getElementById(tab).click();
}
  
function Menu(icon) {
    var x = document.getElementById("tabbar");
    if (x.className === "tab") {
        x.className += " responsive";
    } else {
        x.className = "tab";
    }
}