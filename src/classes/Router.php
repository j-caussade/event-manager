<?php

class Router {
    private string $page;

    public function __construct() {
        $this->page = isset($_GET["page"]) ? $_GET["page"] : HOME;
    }

    public function getPage(): string {
        return $this->page;
    }

    public function getPath(): string {
        $pagePath = PAGES . $this->page . ".php";
        if (!file_exists($pagePath)) {
            header("location:index.php?page=404");
        }
        return $pagePath;
    }
}