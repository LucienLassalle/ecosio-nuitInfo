<?php
session_start();
if (!$_SESSION["connected"]) {
    echo "Utilisateur non connecté.";
    exit();
}

$config = json_decode(file_get_contents("../../config.json"), true);
$conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
if ($conn->connect_error) {
    die('Connexion échouée : ' . $conn->connect_error);
}

$score = file_get_contents("php://input");

$sql = "UPDATE scoreboard SET userScore = userScore + ? WHERE userId = ?";
$stmt = $conn->prepare($sql);
if(!$stmt){
    echo "Erreur lors de la préparation de la requête.";
    exit();
}
$stmt->bind_param("ss", $score, $_SESSION["username"]);
$stmt->execute();
$stmt->close();
$conn->close();
?>
