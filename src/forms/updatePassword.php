<?php

session_start();

require_once "../bdd-conn.php";

$newPassword = password_hash($_POST["newPassword"], PASSWORD_BCRYPT);
$checkNewPassword = $_POST["checkNewPassword"];

$id = $_SESSION["id"];

$reqHoldPassword = $conn->prepare("SELECT passwordUser FROM user WHERE idUser = ?");
$reqHoldPassword->execute([$id]);
$holdPassword = $reqHoldPassword->fetchColumn();

if (password_verify($checkNewPassword, $newPassword) == false) {
    echo "Please rewrite your new password";
} elseif (password_verify($checkNewPassword, $holdPassword) == true) {
    echo "Please write a password different from the actual";
} else {
    $updatePassword = $conn->prepare("UPDATE user SET passwordUser = ? WHERE idUser = ?");
    $updatePassword->execute([$newPassword, $id]);
    header("location:../../index.php?page=profil");
}
