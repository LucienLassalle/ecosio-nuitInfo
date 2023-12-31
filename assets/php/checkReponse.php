<?php
session_start();

$config = json_decode(file_get_contents("../../config.json"), true);
$conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
if ($conn->connect_error) {
    die('Connexion échouée : ' . $conn->connect_error);
}

$answerUser = file_get_contents("php://input");
$questionId = explode("---",$answerUser)[1];
$answerUser = explode("---",$answerUser)[0];

$query = "SELECT * FROM answer WHERE questionId = ? AND answerLabel = ? LIMIT 1";

$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $questionId, $answerUser);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $answerUnique = $result->fetch_assoc();
    if($answerUnique["answerBinary"]){
        echo "True";
    } else {
        $SQL = "SELECT * FROM answer WHERE questionId = ? AND answerBinary = 1";
        $stmt = $conn->prepare($SQL);
        $stmt->bind_param("s", $questionId);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $answerTrue = $result->fetch_assoc();
            echo $answerTrue["answerLabel"];
        } else {
            echo "Erreur lors du chargement de la question." . $_POST["reponse"];
        }
    }
} else {
    echo "Erreur lors du chargement de la question." . $_POST["reponse"];
}