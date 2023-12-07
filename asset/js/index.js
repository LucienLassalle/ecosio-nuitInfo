document.addEventListener("DOMContentLoaded", function() {
    let url = "./assets/html/index.html";
    /** let scripts = ["creation/js/script.js"//, "creation/js/style.js"]; ]; **/
    let scripts = [];
    
    function loadContent() {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;

                let mainElement = document.querySelector("main");
                if (mainElement) {
                    while (tempDiv.firstChild) {
                        mainElement.appendChild(tempDiv.firstChild);
                    }

                    if (scripts.length > 0) {
                        loadScripts(scripts)
                            .then(() => {
                                console.log("Scripts chargés avec succès.");
                            })
                            .catch(error => {
                                console.error("Erreur de chargement du script:", error);
                            });
                    }
                } else {
                    setTimeout(loadContent, 100);
                }
            })
            .catch(error => {
                console.error("Erreur de chargement du fichier HTML:", error);
            });
    }

    loadContent();

    function loadScripts(scripts) {
        let promises = [];
        scripts.forEach(script => {
            promises.push(
                new Promise((resolve, reject) => {
                    let scriptElement = document.createElement("script");
                    scriptElement.src = script;
                    scriptElement.addEventListener("load", resolve);
                    scriptElement.addEventListener("error", reject);
                    document.head.appendChild(scriptElement);
                })
            );
        });
        return Promise.all(promises);
    }
});