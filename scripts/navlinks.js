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

	document.querySelectorAll('.anb').forEach(element => element.classList.add('hiddenDown'));
	document.querySelectorAll('.tabmenu, .activetab, .tablinks').forEach(element => element.classList.add('hiddenLeft'));
	const hiddenUp = document.querySelectorAll('.hiddenUp');
	hiddenUp.forEach(el => observer.observe(el));
	const hiddenDown = document.querySelectorAll('.hiddenDown');
	hiddenDown.forEach(el => observer.observe(el));
	const hiddenLeft = document.querySelectorAll('.hiddenLeft');
	hiddenLeft.forEach(el => observer.observe(el));
	const hiddenRight = document.querySelectorAll('.hiddenRight');
	hiddenRight.forEach(el => observer.observe(el));
}

function Menu(icon) {
	var x = document.getElementById("tabbar");
	if (x.className === "tab") {
		x.className += " responsive";
	} else {
		x.className = "tab";
	}
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('shown');
		}
		else {
			entry.target.classList.remove('shown');
		}
	});
});

