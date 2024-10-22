<?php

require_once "config/bdd-id.php";

define("SERVERNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "");

$conn = new PDO("mysql:host=" . SERVERNAME . ";dbname=event;charset=utf8;port=3306" , USERNAME, PASSWORD);