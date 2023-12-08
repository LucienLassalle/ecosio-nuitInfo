<?php
session_start();
if (!isset($_SESSION["username"])) {
    echo "Utilisateur non connecté.";
    exit();
}

$config = json_decode(file_get_contents("../../config.json"), true);
$conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
if ($conn->connect_error) {
    die('Connexion échouée : ' . $conn->connect_error);
}

$score = file_get_contents("php://input");

$sql = 'UPDATE player SET userScore = userScore + ? WHERE userId = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $score, $_SESSION["userId"]);
$stmt->execute();
$stmt->close();
$conn->close();
echo "Score mis à jour.";
?>
