<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $identifier = $_POST['identifier'];
    $formPassword = $_POST['password'];

    if (strpos($identifier, '@') !== false && strpos($identifier, '.') !== false) {
        $identifierType = 'userEmail';
    } else {
        $identifierType = 'userPseudo';
    }

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

    $stmt = $conn->prepare("SELECT * FROM player WHERE $identifierType = ?"); // Requête préparée à modifié conformément à la base de données
    $stmt->bind_param("s", $identifier);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $storedPassword = $user['userPassword'];

        $formPassword = hash('sha256', $formPassword);

        if ($formPassword == $storedPassword) {
            $_SESSION["connected"] = true;
            $_SESSION["username"] = $user["userPseudo"];
            echo $_SESSION["username"];
            exit();
        } else {
            echo "Mot de passe ou/et pseudonyme/adresse e-mail incorrecte.";
        }
    } else {
        echo "Mot de passe ou/et pseudonyme/adresse e-mail incorrecte.";
    }

    $stmt->close();
    $conn->close();
}
?>