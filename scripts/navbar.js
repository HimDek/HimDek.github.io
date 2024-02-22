function Menu(icon) {
    if (document.getElementById("nav").classList.contains("responsive")) {
        document.getElementById("nav").classList.remove("responsive");
        document.getElementById("navmenu-hamicon").classList.remove("responsive")
        document.getElementById("navbar").classList.remove("bg-primary-subtle")
        document.getElementById("navbar").classList.add("bg-accent-subtle")
        document.getElementById("nav").classList.remove("bg-primary-subtle")
        document.getElementById("nav").classList.add("bg-accent-subtle")
    } else {
        document.getElementById("nav").classList.add("responsive");
        document.getElementById("navmenu-hamicon").classList.add("responsive");
        document.getElementById("navbar").classList.remove("bg-accent-subtle")
        document.getElementById("navbar").classList.add("bg-primary-subtle")
        document.getElementById("nav").classList.remove("bg-accent-subtle")
        document.getElementById("nav").classList.add("bg-primary-subtle")
    }
}