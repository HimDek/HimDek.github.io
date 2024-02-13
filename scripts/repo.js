function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

fetch("/repopagetemplate.html").then(function (response) {
    response.text().then(function (text) {
        var newHTML = document.open("text/html", "replace");
        newHTML.write(text);
        newHTML.close();

        include("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
        include("/scripts/navlinks.js");
        include("/scripts/themeToggle.js");

        fetch("./README.md").then(function (response) {
            response.text().then(function (text) {
                document.getElementById("readme").innerHTML = marked.parse(text);
                document.title = document.getElementById("repo-title").innerHTML + ' | ' + document.getElementById("repo-subtitle").innerHTML
                document.querySelectorAll(".repo-h").forEach(el => {
                    el.innerHTML = document.getElementById("repo-title").innerHTML
                });
                document.querySelectorAll(".repo-s").forEach(el => {
                    el.innerHTML = document.getElementById("repo-subtitle").innerHTML
                });
                document.querySelectorAll(".repo-p").forEach(el => {
                    el.innerHTML = document.getElementById("repo-desc").innerHTML
                });
                document.querySelectorAll(".repo-name").forEach(el => {
                    el.innerHTML = document.getElementById("repo-title").innerHTML
                });
                reponame = document.getElementById("repo-name").innerHTML
                fetch('https://api.github.com/repos/HimDek/' + reponame).then(res => res.json()).then((out) => {
                    url = out.html_url;
                    desc = (out.description == null) ? "" : out.description;
                    stats = document.getElementById("stats")
                    console.log("OK")

                    if (out.has_pages)
                        url = "https://" + out.owner.login + ".github.io/" + out.name;
                    if (!!out.homepage)
                        url = out.homepage

                    // titlea.innerHTML = out.name
                    // cardtext.innerHTML = desc
                    document.querySelectorAll(".repo-link").forEach(el => {
                        el.setAttribute("href", url)
                    });

                    document.querySelectorAll(".repo-updated").forEach(el => {
                        el.innerHTML = timeAgo(new Date(out.updated_at))
                    });

                    document.querySelectorAll(".repo-created").forEach(el => {
                        el.innerHTML = timeAgo(new Date(out.created_at))
                    });

                    document.querySelectorAll(".repo-pushed").forEach(el => {
                        el.innerHTML = timeAgo(new Date(out.pushed_at))
                    });

                    if (out.language != null) {
                        svg = "<svg style=\"padding: 0px; margin:0;\" height=\"26\" width=\"26\"><circle id=\"" + out.id + "\" cx=\"13\" cy=\"13\" r=\"12\" stroke=\"white\" stroke-width=\"1\"></circle></svg>"

                        value = document.createElement("div")
                        value.innerHTML = out.language

                        stat = document.createElement("div")
                        stat.classList.add("fs-6")
                        stat.classList.add("text-body-secondary")
                        stat.innerHTML = "Language"

                        body = document.createElement("span")
                        body.appendChild(value)
                        body.appendChild(stat)

                        icon = document.createElement("span")
                        icon.classList.add("pe-4")
                        icon.innerHTML = svg

                        span = document.createElement("span")
                        span.classList.add("d-flex")
                        span.classList.add("align-items-center")
                        span.classList.add("justify-items-start")
                        span.classList.add("text-body")
                        span.classList.add("ff-mono")
                        span.appendChild(icon)
                        span.appendChild(body)

                        li = document.createElement("li")
                        li.classList.add("list-group-item")
                        li.classList.add("bg-transparent")
                        li.appendChild(span)

                        stats.appendChild(li)
                        colorize(out.id, out.language);
                    }

                    if (out.stargazers_count >= 1) {
                        starurl = "https://github.com/" + out.owner.login.toLowerCase() + "/" + out.name.toLowerCase() + "/stargazers";
                        svg = "<svg aria-hidden=\"true\" height=\"29\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"26\" data-view-component=\"true\"><path fill-rule=\"evenodd\" d=\"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z\"></path></svg>"

                        value = document.createElement("div")
                        value.innerHTML = out.stargazers_count.toString()

                        stat = document.createElement("div")
                        stat.classList.add("fs-6")
                        stat.classList.add("text-body-secondary")
                        stat.innerHTML = "Stars"

                        body = document.createElement("span")
                        body.appendChild(value)
                        body.appendChild(stat)

                        icon = document.createElement("span")
                        icon.classList.add("pe-4")
                        icon.innerHTML = svg

                        span = document.createElement("span")
                        span.classList.add("d-flex")
                        span.classList.add("align-items-center")
                        span.classList.add("justify-items-start")
                        span.classList.add("text-body")
                        span.classList.add("ff-mono")
                        span.appendChild(icon)
                        span.appendChild(body)

                        a = document.createElement("a")
                        a.setAttribute('href', starurl)
                        a.appendChild(span)

                        li = document.createElement("li")
                        li.classList.add("list-group-item")
                        li.classList.add("bg-transparent")
                        li.appendChild(a)

                        stats.appendChild(li)
                    }

                    if (out.forks >= 1) {
                        forkurl = "https://github.com/" + out.owner.login.toLowerCase() + "/" + out.name.toLowerCase() + "/network/members"
                        svg = "<svg aria-hidden=\"true\" height=\"29\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"26\" data-view-component=\"true\"><path fill-rule=\"evenodd\" d=\"M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z\"></path></svg>"

                        value = document.createElement("div")
                        value.innerHTML = out.forks.toString()

                        stat = document.createElement("div")
                        stat.classList.add("fs-6")
                        stat.classList.add("text-body-secondary")
                        stat.innerHTML = "Forks"

                        body = document.createElement("span")
                        body.appendChild(value)
                        body.appendChild(stat)

                        icon = document.createElement("span")
                        icon.classList.add("pe-4")
                        icon.innerHTML = svg

                        span = document.createElement("span")
                        span.classList.add("d-flex")
                        span.classList.add("align-items-center")
                        span.classList.add("justify-items-start")
                        span.classList.add("text-body")
                        span.classList.add("ff-mono")
                        span.appendChild(icon)
                        span.appendChild(body)

                        a = document.createElement("a")
                        a.setAttribute("href", forkurl)
                        a.appendChild(span)

                        li = document.createElement("li")
                        li.classList.add("list-group-item")
                        li.classList.add("bg-transparent")
                        li.appendChild(a)

                        stats.appendChild(li)
                    }

                    if (out.open_issues >= 1) {
                        issueurl = "https://github.com/" + out.owner.login.toLowerCase() + "/" + out.name.toLowerCase() + "/issues"
                        svg = "<svg aria-hidden=\"true\" height=\"26\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"26\" data-view-component=\"true\"><path d=\"M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z\"></path><path d=\"M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z\"></path></svg>"

                        value = document.createElement("div")
                        value.innerHTML = out.open_issues

                        stat = document.createElement("div")
                        stat.classList.add("fs-6")
                        stat.classList.add("text-body-secondary")
                        stat.innerHTML = "Open Issues"

                        body = document.createElement("span")
                        body.appendChild(value)
                        body.appendChild(stat)

                        icon = document.createElement("span")
                        icon.classList.add("pe-4")
                        icon.innerHTML = svg

                        span = document.createElement("span")
                        span.classList.add("d-flex")
                        span.classList.add("align-items-center")
                        span.classList.add("justify-items-start")
                        span.classList.add("text-body")
                        span.classList.add("ff-mono")
                        span.appendChild(icon)
                        span.appendChild(body)

                        a = document.createElement("a")
                        a.setAttribute("href", issueurl)
                        a.appendChild(span)

                        li = document.createElement("li")
                        li.classList.add("list-group-item")
                        li.classList.add("bg-transparent")
                        li.appendChild(a)

                        stats.appendChild(li)
                    }

                    if (out.license != null) {
                        licenseurl = "https://choosealicense.com/licenses/" + out.license.key
                        svg = "<svg aria-hidden=\"true\" height=\"26\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"26\" data-view-component=\"true\" class=\"octicon octicon-law mr-1\"><path fill-rule=\"evenodd\" d=\"M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z\"></path></svg>";

                        value = document.createElement("div")
                        value.innerHTML = out.license.name

                        stat = document.createElement("div")
                        stat.classList.add("fs-6")
                        stat.classList.add("text-body-secondary")
                        stat.innerHTML = "License"

                        body = document.createElement("span")
                        body.appendChild(value)
                        body.appendChild(stat)

                        icon = document.createElement("span")
                        icon.classList.add("pe-4")
                        icon.innerHTML = svg

                        span = document.createElement("span")
                        span.classList.add("d-flex")
                        span.classList.add("align-items-center")
                        span.classList.add("justify-items-start")
                        span.classList.add("text-body")
                        span.classList.add("ff-mono")
                        span.appendChild(icon)
                        span.appendChild(body)

                        a = document.createElement("a")
                        a.setAttribute("href", licenseurl)
                        a.appendChild(span)

                        li = document.createElement("li")
                        li.classList.add("list-group-item")
                        li.classList.add("bg-transparent")
                        li.appendChild(a)

                        stats.appendChild(li)
                    }
                });
                fetch('https://api.github.com/repos/HimDek/' + reponame + '/pulls').then(res => res.json()).then((out) => {
                    if (out.length >= 1) {
                        pullurl = "https://github.com/HimDek/" + reponame + "/pulls"
                        svg = "<svg aria-hidden=\"true\" height=\"26\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"26\" data-view-component=\"true\"><path d=\"M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z\"></path></svg>"

                        value = document.createElement("div")
                        value.innerHTML = out.length.toString()

                        stat = document.createElement("div")
                        stat.classList.add("fs-6")
                        stat.classList.add("text-body-secondary")
                        stat.innerHTML = "Open Pull Requests"

                        body = document.createElement("span")
                        body.appendChild(value)
                        body.appendChild(stat)

                        icon = document.createElement("span")
                        icon.classList.add("pe-4")
                        icon.innerHTML = svg

                        span = document.createElement("span")
                        span.classList.add("d-flex")
                        span.classList.add("align-items-center")
                        span.classList.add("justify-items-start")
                        span.classList.add("text-body")
                        span.classList.add("ff-mono")
                        span.appendChild(icon)
                        span.appendChild(body)

                        a = document.createElement("a")
                        a.setAttribute("href", pullurl)
                        a.appendChild(span)

                        li = document.createElement("li")
                        li.classList.add("list-group-item")
                        li.classList.add("bg-transparent")
                        li.appendChild(a)

                        stats.appendChild(li)
                    }
                });
                const typing = document.querySelectorAll('.typing');
                typing.forEach(el => typingobserver.observe(el));
            });
        });
    });
});

function colorize(id, lang) {
    fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json").then(res => res.json()).then((col) => {
        for (const x in col)
            if (x == lang)
                document.getElementById(id).setAttribute("fill", col[x].color);
    });
}

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return 'on ' + month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return 'on ' + month[date.getMonth()] + ' ' + date.getDate()
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days ago';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes ago';
    }

    if (seconds < 10) return 'just now';

    return Math.floor(seconds) + ' seconds ago';
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