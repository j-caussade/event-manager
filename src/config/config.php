<?php

define("SRC", "./src/");

define("TEMPLATE", SRC . "template/");

define("COMPONENTS", TEMPLATE . "components/");

define("ASSETS", "./assets/");

define("IMAGE", ASSETS . "img/");

define("PAGES", TEMPLATE . "pages/");

define("FORMS", SRC . "forms/");

define("ROUTES", include SRC . "config/routes.php");

define("HOME", "home");

include SRC . "config/bdd-id.php";