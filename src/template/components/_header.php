<header>
    <nav>
        <div id="menu">
            <a href="./index.php"><img src=<?= IMAGE . "home.svg" ?> alt="Home" id="icon"/></a>
            <a href="./index.php?page=events">Events</a>
            <a href="./index.php?page=contact-us">Contact us</a>
            <a href="./index.php?page=about-us">About us</a>
        </div>
        <div id="profil">
            <a href="./index.php?page=profil">
                <?php
                    if(!isset($_SESSION['id'])){
                        echo "<img src='./assets/img/account_off.svg' alt='Account off' id='icon'/>";
                    }else{
                        echo "<img src='./assets/img/account.svg' alt='Account' id='icon'/>";
                    }
                ?>
            </a>
        </div>
    </nav>
</header>