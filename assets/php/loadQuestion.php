<?php
session_start();

$config = json_decode(file_get_contents("../../config.json"), true);
$conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
if ($conn->connect_error) {
    die('Connexion échouée : ' . $conn->connect_error);
}
$query = "SELECT questionId FROM question";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $questionIds = array();
    while ($questionId = $result->fetch_assoc()) {
        array_push($questionIds, $questionId["questionId"]);
    }
} else {
    echo "Erreur lors du chargement des questions.";
}

// Récupérer une valeur aléatoire dans un tableau
$questionIdtRandom = randomValue($questionIds);

$query = "SELECT * FROM question WHERE questionId = ? LIMIT 1";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $questionIdtRandom);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $question = $result->fetch_assoc();

    $questionId = $question["questionId"];
    $questionText = $question["questionLabel"];
    $questionAnswer = $question["questionExplication"];

    $query = "SELECT * FROM answer WHERE questionId = $questionId";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        $answers = array();
        while ($answer = $result->fetch_assoc()) {
            array_push($answers, $answer["answerLabel"]);
        }
    }
    $output = stringify($answers);
    $output = $questionText . "---" . $output . $questionAnswer . "---" . $questionId;
    echo $output;
} else {
    echo "Erreur lors du chargement de la question.";
}
  
function stringify($array) {
    $output = "";
    foreach ($array as $value) {
        $output .= $value . "---";
    }
    return $output;
}
function randomValue($array) {
    $randomIndex = rand(0, count($array) - 1);
    return $array[$randomIndex];
}