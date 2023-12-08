document.addEventListener("DOMContentLoaded", function() {
    genereScoreboard();
});


function genereScoreboard() {
    let main = document.getElementById("main");
    main.innerHTML = "";

    let titre = document.createElement("h1");
    titre.innerHTML = "Scoreboard";
    main.appendChild(titre);

    let tableau = document.createElement("table");
    tableau.id = "tableau";
    main.appendChild(tableau);

    let tr = document.createElement("tr");
    tableau.appendChild(tr);

    let thPseudo = document.createElement("th");
    thPseudo.innerHTML = "Pseudo";
    tr.appendChild(thPseudo);

    let thScore = document.createElement("th");
    thScore.innerHTML = "Score";
    tr.appendChild(thScore);

    fetch("./assets/php/loadScoreboard.php")
        .then(response => response.text())
        .then(data => {
            let tabValeur = data.split("---");
            for(let i = 0; i < tabValeur.length - 1; i++){
                let tr = document.createElement("tr");
                tableau.appendChild(tr);

                let tdPseudo = document.createElement("td");
                tdPseudo.innerHTML = tabValeur[i];
                tr.appendChild(tdPseudo);

                let tdScore = document.createElement("td");
                tdScore.innerHTML = tabValeur[i + 1];
                tr.appendChild(tdScore);

                i++;
            }
        });
}