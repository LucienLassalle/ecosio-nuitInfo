function evtOnMenuClicked() {
    if(document.getElementById("menu").classList.contains("hidden")){
        document.getElementById("menu").classList.remove("hidden");
    } else {
        document.getElementById("menu").classList.add("hidden");
    }
}

function evtDisplayLogin() {
    if(document.getElementById("connexion") != null){
        document.getElementById("connexion").remove();
    } else {

    fetch("./assets/html/connexion.html")
        .then(response => response.text())
        .then(html => {
            let div = document.createElement("div");
            div.innerHTML = html;
            document.getElementById("main").appendChild(div);
        })
        .catch(error => {
            console.error("Erreur de chargement du fichier HTML:", error);
        });
    }
}