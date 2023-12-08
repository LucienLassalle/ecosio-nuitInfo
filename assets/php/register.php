<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $formPseudo = $_POST["PseudoInscription"];
    $formEmail = $_POST['emailInscription'];
    $formPassword = $_POST['mdpInscription'];

    $formPassword = hash('sha256', $formPassword);

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

    $insertSQL = "INSERT INTO player (userPseudo, userEmail, userPassword) VALUES ('$formPseudo', '$formEmail', '$formPassword')";
    if($conn->query($insertSQL)){
        $stmt = $conn->prepare("SELECT * FROM player WHERE userPseudo = ?"); // Requête préparée à modifié conformément à la base de données
        $stmt->bind_param("s", $formPseudo);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $identifiant = $user["userId"];
        $insertSQL = "INSERT INTO scoreboard (userId) VALUES ('$identifiant')";
        $conn->query($insertSQL);
        $_SESSION["connected"] = true;
        $_SESSION["username"] = $user["userId"];
        echo "Inscription réussie !";
    } else {
        echo "Erreur lors de l'inscription pour la raison suivante : " . $conn->error . ".";
    }


}
?>