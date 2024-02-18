function observeanimation() {
    document.getElementById('theme-icon').classList.add('shrunk');
    document.querySelectorAll('.typing').forEach(el => typingobserver.observe(el));
    document.querySelectorAll('.anb, .badge').forEach(element => element.classList.add('shrunk'));
    document.querySelectorAll('.tabmenu, .activetab, .tablinks').forEach(element => element.classList.add('hiddenLeft'));
    document.querySelectorAll('.hiddenUp').forEach(el => observer.observe(el));
    document.querySelectorAll('.hiddenDown').forEach(el => observer.observe(el));
    document.querySelectorAll('.hiddenLeft').forEach(el => observer.observe(el));
    document.querySelectorAll('.hiddenRight').forEach(el => observer.observe(el));
    document.querySelectorAll('.hiddenX').forEach(el => observer.observe(el));
    document.querySelectorAll('.hiddenY').forEach(el => observer.observe(el));
    document.querySelectorAll('.shrunk').forEach(el => observer.observe(el));
    document.querySelectorAll('.bg-contain').forEach(el => observer.observe(el));
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
            entry.target.classList.add('bg-show');
        }
        else {
            entry.target.classList.remove('shown');
            entry.target.classList.remove('expanded');
            entry.target.classList.remove('bg-show');
        }
    });
});