<?php

    require_once "./src/bdd-conn.php";

    $idUser = $_SESSION["id"];
    // $currentEvent = $event["idEvent"]; //

    var_dump($idUser);

    
    $stmt = $conn->prepare("CALL unsubscribe(?, ?);");
    $stmt->execute([$idUser, $currentEvent]);

    var_dump($currentEvent);

    // header("location:index.php");
