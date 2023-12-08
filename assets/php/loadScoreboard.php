<?php
session_start();

$config = json_decode(file_get_contents("../../config.json"), true);
$conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
if ($conn->connect_error) {
    die('Connexion échouée : ' . $conn->connect_error);
}

$query = "SELECT userPseudo, userScore FROM player, scoreboard WHERE player.userId = scoreboard.userId ORDER BY userScore DESC LIMIT 50";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $output = "";
    while ($row = $result->fetch_assoc()) {
        $output .= $row["userPseudo"] . "---" . $row["userScore"] . "---";
    }
    echo $output;
} else {
    echo "Erreur lors du chargement du classement.";
}