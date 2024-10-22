<?php

session_start();

require_once "../bdd-conn.php";

$email = $_POST["email"];
$password = $_POST["password"];

$recoverUsers = $conn->prepare("SELECT * FROM user WHERE emailUser = ?");
$recoverUsers->execute([$email]);
$user = $recoverUsers->fetch();

if ($user) {
    $hash = $user["passwordUser"];
    if (password_verify($password, $hash)) {
        echo 'Password is valid!';
        $_SESSION["email"] = $email;
        $_SESSION["id"] = $user['idUser'];
        $_SESSION["role"] = $user["roleUser"];
    
        header("location:../../index.php?page=profil");
    } else {
        echo 'Invalid password.';
    }

}else{
    echo("Invalid email.");
}