fetch("/header.htm").then(function(response) {
    response.text().then(function(text) {
        document.getElementById("header").innerHTML = text;
    });
});