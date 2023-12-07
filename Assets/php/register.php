<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $formPseudo = $_POST["pseudo"];
    $formEmail = $_POST['email'];
    $formPassword = $_POST['password'];

    $configFile = file_get_contents('../../config.json');
    $config = json_decode($configFile, true);
    $servername = $config['servername'];
    $username = $config['username'];
    $dbPassword = $config['password'];
    $dbname = $config['dbname'];
    $conn = new mysqli($servername, $username, $dbPassword, $dbname);
    if ($conn->connect_error) {
        die("Erreur de connexion à la base de données: " . $conn->connect_error);
    }

    $insertSQL = "INSERT INTO player (pseudo, email, motDePasse) VALUES ('$formPseudo', '$formEmail', '$formPassword')";
    if($conn->query($insertSQL)){
        echo "Inscription réussie !";
    }


}
?>