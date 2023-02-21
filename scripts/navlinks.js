fetch("/tab.txt").then(function(response) {
    	response.text().then(function(text) {
    		document.getElementById("navbar").innerHTML = text + document.getElementById("navbar").innerHTML;
    	});
});

function Menu(icon) {
	var x = document.getElementById("tabbar");
	if (x.className === "tab") {
		x.className += " responsive";
	} else {
		x.className = "tab";
	}
}

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
	document.getElementById("repos").innerHTML = document.getElementById("repos").innerHTML + " <span>" + count + "</span>"
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
	document.getElementById("gists").innerHTML = document.getElementById("gists").innerHTML + " <span>" + count + "</span>";
})