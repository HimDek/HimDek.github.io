function observeanimation() {
    const typing = document.querySelectorAll('.typing');
    typing.forEach(el => typingobserver.observe(el));
    document.getElementById('theme-icon').classList.add('shrunk');
    document.querySelectorAll('.anb').forEach(element => element.classList.add('shrunk'));
    document.querySelectorAll('.badge').forEach(element => element.classList.add('shrunk'));
    document.querySelectorAll('.tabmenu, .activetab, .tablinks').forEach(element => element.classList.add('hiddenLeft'));
    const hiddenUp = document.querySelectorAll('.hiddenUp');
    hiddenUp.forEach(el => observer.observe(el));
    const hiddenDown = document.querySelectorAll('.hiddenDown');
    hiddenDown.forEach(el => observer.observe(el));
    const hiddenLeft = document.querySelectorAll('.hiddenLeft');
    hiddenLeft.forEach(el => observer.observe(el));
    const hiddenRight = document.querySelectorAll('.hiddenRight');
    hiddenRight.forEach(el => observer.observe(el));
    const hiddenX = document.querySelectorAll('.hiddenX');
    hiddenX.forEach(el => observer.observe(el));
    const hiddenY = document.querySelectorAll('.hiddenY');
    hiddenY.forEach(el => observer.observe(el));
    const shrunk = document.querySelectorAll('.shrunk');
    shrunk.forEach(el => observer.observe(el));
}

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

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('shown');
            entry.target.classList.add('expanded');
        }
        else {
            entry.target.classList.remove('shown');
            entry.target.classList.remove('expanded');
        }
    });
});