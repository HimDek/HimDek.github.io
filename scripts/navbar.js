function Menu(icon) {
    if (document.getElementById("nav").classList.contains("responsive")) {
        document.getElementById("nav").classList.remove("responsive");
        document.getElementById("nav-menu-hamicon").classList.remove("responsive")
        document.getElementById("nav").classList.remove("bg-primary-subtle")
        document.getElementById("nav").classList.add("bg-accent-subtle")
    } else {
        document.getElementById("nav").classList.add("responsive");
        document.getElementById("nav-menu-hamicon").classList.add("responsive");
        document.getElementById("nav").classList.remove("bg-accent-subtle")
        document.getElementById("nav").classList.add("bg-primary-subtle")
    }
}