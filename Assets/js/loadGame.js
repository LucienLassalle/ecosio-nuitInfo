var Images = ["./assets/img/banquise1"];
var explication = "";

document.addEventListener("DOMContentLoaded", function() {
    // Demander au PHP si l'utilisateur est connecté, si ce n'est pas le cas, bloquer l'accès est demandé un enregistrement ou une connexion
    // Si l'utilisateur est connecté, alors on charge le jeu en PHP
    // Chaque événement JS doit être traité avec le JS
    genereJeux();
});


function genereJeux() {
    let main = document.getElementById("main");
    main.innerHTML = "";

    let explication = document.createElement("div");
    explication.id = "explication";
    explication.innerHTML = "Les explications de la réponse seront affichées ici";

    main.appendChild(explication);
    let divPrincipale = document.createElement("div");
    divPrincipale.id = "divPrincipale";
    main.appendChild(divPrincipale);

    let question = document.createElement("span");
    question.id = "question";
    divPrincipale.appendChild(question);

    let divReponses = document.createElement("div");
    divReponses.id = "divReponses";
    divPrincipale.appendChild(divReponses);

    for(let i = 1; i < 4; i++){
        let divReponse = document.createElement("div");
        divReponse.className = "divReponse";
        divReponse.id = "divReponse" + i;
        divReponse.addEventListener("click", function(){
            console.log("click sur la réponse " + i) // TODO : Demander la réponse au PHP
        });
        divReponses.appendChild(divReponse);
    }

    let imageDiv = document.createElement("div");
    imageDiv.id = "divImage";
    main.appendChild(imageDiv);

    let image = document.createElement("img");
    image.id = "image";
    imageDiv.appendChild(image);
}

function genereQuestion(){
    fetch("./assets/php/loadQuestion.php")
        .then(response => response.text())
        .then(data => {
            let tabValeur = data.split("---");
            let question = document.getElementById("question");
            question.innerHTML = tabValeur[0];
            let divReponse1 = document.getElementById("divReponse1");
            divReponse1.innerHTML = tabValeur[1];
            let divReponse2 = document.getElementById("divReponse2");
            divReponse2.innerHTML = tabValeur[2];
            let divReponse3 = document.getElementById("divReponse3");
            divReponse3.innerHTML = tabValeur[3];
            explication = tabValeur[4];
            let image = document.getElementById("image");
            image.src = Images[0];
        })
        .catch(error => {
            console.error("Erreur de chargement du fichier :", error);
        });
}
function checkReponse(reponse){
    fetch("./assets/php/checkReponse.php", {
        method: "POST",
        body: reponse
    }).then(response => response.text())
    .then(data => {
        if(data == "true"){
            // TODO : Afficher la bonne réponse en vert
        } else {
            // TODO : Afficher la bonne réponse en vert et la réponse de l'utilisateur en rouge
        }
    })
    .catch(error => {
        console.error("Erreur de chargement du fichier :", error);
    });
    document.getElementById("explication").innerHTML = explication;
    genereQuestion();
}