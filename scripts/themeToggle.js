navbar = document.getElementById("navbar");

theme = document.createElement("div");
themebutton = document.createElement("button");
themeIcon = document.createElement("div");

theme.classList.add("navright");
themebutton.classList.add("change-theme");
themeIcon.classList.add("material-symbols-rounded");

themebutton.setAttribute("onclick", "themeToggle()");
themebutton.setAttribute("onkeydown", "if(event.key === 'Enter'){themeToggle()}");

themeIcon.setAttribute("id", "theme-icon")
themeIcon.innerHTML = "dark_mode";

themebutton.appendChild(themeIcon);
theme.appendChild(themebutton);
navbar.appendChild(theme);

function lightTheme() {
    themeIcon.textContent = "dark_mode";
    document.documentElement.setAttribute('theme', 'light');
}

function darkTheme() {
    themeIcon.textContent = "light_mode";
    document.documentElement.setAttribute('theme', 'dark');
}

(function() {
    let onPageLoad = localStorage.getItem("theme") || "";
    if (onPageLoad === "") {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            localStorage.setItem("theme", "light_mode");
            lightTheme()
        }
        else {
            localStorage.setItem("theme", "dark_mode");
            darkTheme()
        }
    }

    if (onPageLoad === "light_mode") {
        lightTheme()
    }
    if (onPageLoad === "dark_mode") {
        darkTheme()
    }
})();

function themeToggle() {
    let theme = localStorage.getItem("theme");
    if (theme && theme === "dark_mode") {
        localStorage.setItem("theme", "light_mode");
        lightTheme()
    }
    else if (theme && theme === "light_mode") {
        localStorage.setItem("theme", "dark_mode");
        darkTheme()
    }
}