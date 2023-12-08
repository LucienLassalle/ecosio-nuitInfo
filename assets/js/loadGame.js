var Images = ["./assets/img/banquise1"];
var explication = "";
var isAnswered = false;

document.addEventListener("DOMContentLoaded", function() {
    // Demander au PHP si l'utilisateur est connecté, si ce n'est pas le cas, bloquer l'accès est demandé un enregistrement ou une connexion
    // Si l'utilisateur est connecté, alors on charge le jeu en PHP
    // Chaque événement JS doit être traité avec le JS
    genereJeux();
    genereQuestion();
});


function genereJeux() {
    let main = document.getElementById("main");
    main.innerHTML = "";

    let explication = document.createElement("div");
    explication.id = "explication";
    explication.innerHTML = "Lorsque vous aurez réussis la question, vous aurez l'explication ici pour approfondir vos connaissances";

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
            checkReponse(i);
        });
        divReponses.appendChild(divReponse);
    }

    let imageDiv = document.createElement("div");
    imageDiv.id = "divImage";
    main.appendChild(imageDiv);

    let image = document.createElement("img");
    image.id = "image";
    imageDiv.appendChild(image);

    let next = document.createElement("button");
    next.id = "next";
    next.innerHTML = "Suivant";
    next.addEventListener("click", function(){
        nextChallenge();
    });
    main.appendChild(next);
}

function genereQuestion(){
    document.getElementById("explication").innerHTML = "Lorsque vous aurez réussis la question, vous aurez l'explication ici pour approfondir vos connaissances";
    fetch("./assets/php/loadQuestion.php")
        .then(response => response.text())
        .then(data => {
            let tabValeur = data.split("---");
            let question = document.getElementById("question");
            question.innerHTML = "La question est : " + tabValeur[0];
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
    if(!isAnswered){
    isAnswered = true;
    fetch("./assets/php/checkReponse.php", {
        method: "POST",
        body: reponse
    }).then(response => response.text())
    .then(data => {
        if(data.includes("True")){
            document.getElementById("divReponse" + reponse).classList.add("green");
            updateScore(1);
        } else {
            for(let i = 0; i < document.getElementsByClassName("divReponse").length; i++){
                if(data == document.getElementsByClassName("divReponse")[i].innerHTML){
                    document.getElementsByClassName("divReponse")[i].classList.add("green");
                }
                document.getElementById("divReponse" + reponse).classList.add("red");
            }
            updateScore(-1);
        }
    })
    .catch(error => {
        console.error("Erreur de chargement du fichier :", error);
    });
    document.getElementById("explication").innerHTML = explication;
    }
}


function nextChallenge(){
    isAnswered = false;
    for(let i = 0; i < document.getElementsByClassName("divReponse").length; i++){
        document.getElementsByClassName("divReponse")[i].classList.remove("red");
        document.getElementsByClassName("divReponse")[i].classList.remove("green");
    }
    genereQuestion();
}

function updateScore(score){
    fetch("./assets/php/updateScore.php", {
        method: "POST",
        body: score
    }).then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Erreur de chargement du fichier :", error);
    });
}