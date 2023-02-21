fetch("footer.txt").then(function(response) {
    response.text().then(function(text) {
        document.getElementById("footer").innerHTML = text;
    });
});