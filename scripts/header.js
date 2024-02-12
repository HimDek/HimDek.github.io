fetch("/header.htm").then(function (response) {
    response.text().then(function (text) {
        document.getElementById("header").innerHTML = text;
        const typing = document.querySelectorAll('.typing');
        typing.forEach(el => typingobserver.observe(el));
    });
});

const typingobserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('typing-demo');
        }
        else {
            entry.target.classList.remove('typing-demo');
        }
    });
});