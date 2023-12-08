var Images = ["./assets/logo/banquise1.jpg","./assets/logo/banquise2.jpg","./assets/logo/banquise3.jpg","./assets/logo/banquise4.jpg","./assets/logo/banquise5.jpg"];
var explication = "";
var isAnswered = false;
var questionId = -1;
var indexImage = 0;

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
    explication.innerHTML = "Lorsque vous aurez répondu à la question, vous aurez l'explication ici pour approfondir vos connaissances";

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
    image.src = Images[indexImage];

    let next = document.createElement("button");
    next.id = "next";
    next.innerHTML = "Suivant";
    next.addEventListener("click", function(){
        nextChallenge();
    });
    main.appendChild(next);
}

function genereQuestion(){
    document.getElementById("explication").innerHTML = "Lorsque vous aurez répondu à la question, vous aurez l'explication ici pour approfondir vos connaissances";
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
            questionId = tabValeur[5];
        })
        .catch(error => {
            console.error("Erreur de chargement du fichier :", error);
        });
}
function checkReponse(reponse){
    let reponseUtilisateur = document.getElementById("divReponse" + reponse).innerHTML;
    reponseUtilisateur = reponseUtilisateur + "---" + questionId;
    if(!isAnswered){
    isAnswered = true;
    fetch("./assets/php/checkReponse.php", {
        method: "POST",
        body: reponseUtilisateur
    }).then(response => response.text())
    .then(data => {
        if(data.includes("True")){
            document.getElementById("divReponse" + reponse).classList.add("green");
            updateScore(1);
            changementImage(1);
        } else {
            for(let i = 0; i < document.getElementsByClassName("divReponse").length; i++){
                if(data == document.getElementsByClassName("divReponse")[i].innerHTML){
                    document.getElementsByClassName("divReponse")[i].classList.add("green");
                }
                document.getElementById("divReponse" + reponse).classList.add("red");
            }
            updateScore(-1);
            changementImage(-1);
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
function changementImage(valeur){
    indexImage += -valeur;
    if(indexImage < 0){
        indexImage = 0;
    } else if(indexImage > Images.length - 1){
        indexImage = Images.length - 1;
    }
    document.getElementById("image").src = Images[indexImage];
}