<?php 

session_start();

require_once "./src/config/config.php";
require_once SRC . "classes/Router.php";

	$router = new Router();
	$page = $router->getPage();
	$pagePath = $router->getPath();

include TEMPLATE . "base.php";
