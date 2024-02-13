fetch("/tab.htm").then(function (response) {
	response.text().then(function (text) {
		document.getElementById("navbar").innerHTML = text + document.getElementById("navbar").innerHTML;
		init()
		fetch("https://api.github.com/users/HimDek/repos").then(res => res.json()).then((out) => {
			count = 0;
			for (let i = 0; ; i++) {
				if (out[i] == null) {
					break;
				}
				if (out[i].name.toLowerCase() == out[i].owner.login.toLowerCase() || out[i].name.toLowerCase() == out[i].owner.login.toLowerCase() + ".github.io") {
					continue;
				}
				count++;
			}
			document.getElementById("repos").innerHTML = document.getElementById("repos").innerHTML + " <span class='badge rounded-pill bg-secondary'>" + count + "</span>"
		})

		fetch("https://api.github.com/users/HimDek/gists").then(res => res.json()).then((out) => {
			count = 0;
			divtxt = "";
			for (let i = 0; ; i++) {
				if (out[i] == null || Object.keys(out[i].files)[0] == null) {
					break;
				}
				count++;
			}
			document.getElementById("gists").innerHTML = document.getElementById("gists").innerHTML + " <span class='badge rounded-pill bg-secondary'>" + count + "</span>";
		})
	});
});

function init() {
	console.log("Initing")
	var i, tablinks;

	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove("active");
	}
	document.getElementById("activetab").classList.remove("shown");
	document.getElementById("activetab").addEventListener("transitionend", () => {
		document.getElementById("activetab").classList.add("shown");
	});
}

function Menu(icon) {
	var x = document.getElementById("tabbar");
	if (x.className === "tab") {
		x.className += " responsive";
	} else {
		x.className = "tab";
	}
}


