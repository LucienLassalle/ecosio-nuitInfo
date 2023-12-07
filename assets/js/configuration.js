document.addEventListener("DOMContentLoaded", function() {
    let urls = [
        { valeur: 1,  url: "./assets/html/header.html", scripts: [] }, // scripts: ["../assets/js/menu.js", "../assets/js/login.js", "../assets/js/sous-menu.js", "../assets/js/header.js"] },
        { valeur: -1, url: "./assets/html/footer.html", scripts: [] }
    ];
    for (let i = 0; i < urls.length; i++) {
        loadHtml(urls, i);
    }
});


function loadHtml(urls, index) {
    let url = urls[index].url;
    let scripts = urls[index].scripts;
    let valeur = urls[index].valeur;


    fetch(url)
        .then(response => response.text())
        .then(html => {
            if(valeur == 1){
                document.getElementsByTagName("header")[0].innerHTML = html;
            } else if(valeur == -1){
                document.getElementsByTagName("footer")[0].innerHTML = html;
            }  else {
                let div = document.createElement("div");
                div.innerHTML = html;
                document.getElementsByTagName("main")[0].appendChild(div);
            }
            loadScripts(scripts)
        })
        .catch(error => {
            console.error("Erreur de chargement du fichier HTML:", error);
        });
}

function loadScripts(scripts) {
    let promises = scripts.map(script => {
        return new Promise((resolve, reject) => {
            let scriptElement = document.createElement("script");
            scriptElement.src = script;
            scriptElement.addEventListener("load", resolve);
            scriptElement.addEventListener("error", reject);
            document.head.appendChild(scriptElement);
        });
    });
    return Promise.all(promises);
}
