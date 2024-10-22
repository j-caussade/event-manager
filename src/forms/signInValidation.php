<?php

require_once "../bdd-conn.php";

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$email = $_POST["email"];
$password = password_hash($_POST["password"], PASSWORD_BCRYPT);
$role = "user";

$stmt = $conn->prepare("INSERT INTO user VALUES (NULL, :firstNameUser, :lastNameUser, :emailUser, :passwordUser, :roleUser)");
$stmt->bindParam(":firstNameUser", $firstName);
$stmt->bindParam(":lastNameUser", $lastName);
$stmt->bindParam(":emailUser", $email);
$stmt->bindParam(":passwordUser", $password);
$stmt->bindParam(":roleUser", $role);
$stmt->execute();

header("location:../../index.php?page=profil");