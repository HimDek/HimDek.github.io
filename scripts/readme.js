fetch("README.md").then(function(response) {
    response.text().then(function(text) {
        document.getElementById("readme").innerHTML = marked.parse(text);
    });
});