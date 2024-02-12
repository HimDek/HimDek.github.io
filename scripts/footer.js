fetch("/footer.htm").then(function(response) {
    response.text().then(function(text) {
        document.getElementById("footer").innerHTML = text;
    });
});