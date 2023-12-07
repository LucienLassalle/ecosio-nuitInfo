document.addEventListener("DOMContentLoaded", function() {
    let urls = [
        { url: "./assets/html/header.html", scripts: [] }, // scripts: ["../assets/js/menu.js", "../assets/js/login.js", "../assets/js/sous-menu.js", "../assets/js/header.js"] },
        { url: "./assets/html/footer.html", scripts: [] }
    ];

    loadHtml(urls, 0);

    function loadHtml(urls, index) {
        if (index >= urls.length) {
            return;
        }

        let url = urls[index].url;
        let scripts = urls[index].scripts;

        fetch(url)
            .then(response => response.text())
            .then(html => {
                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;

                insertElements(tempDiv, index);

                if (scripts.length > 0) {
                    loadScripts(scripts)
                        .then(() => {
                            loadHtml(urls, index + 1);
                        })
                        .catch(error => {
                            console.error("Erreur de chargement du script:", error);
                        });
                } else {
                    loadHtml(urls, index + 1);
                }
            })
            .catch(error => {
                console.error("Erreur de chargement du fichier HTML:", error);
            });
    }

    function insertElements(tempDiv, index) {
        let mainElement = document.querySelector("main");

        if (index === 0) {
            while (tempDiv.firstChild) {
                document.body.insertBefore(tempDiv.firstChild, mainElement);
            }
        } else if (index === 1) {
            while (tempDiv.firstChild) {
                document.body.insertBefore(tempDiv.firstChild, mainElement);
            }
        } else if (index === urls.length - 1) {
            while (tempDiv.firstChild) {
                document.body.appendChild(tempDiv.firstChild);
            }
        }
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
});
