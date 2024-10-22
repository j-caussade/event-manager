<?php
    require_once SRC . "bdd-conn.php";

    if(isset($_SESSION["id"])){
        $id = $_SESSION["id"];

        $reqFirstLastNameUser = $conn->prepare("SELECT firstNameUser, lastNameUser FROM user WHERE idUser = ?");
        $reqFirstLastNameUser->execute([$id]);
    
        $resultFirstLastNameUser = $reqFirstLastNameUser->fetchall(PDO::FETCH_ASSOC);
    }
?>

<main>
    <h1>Profil</h1>

    <?php if(!isset($_SESSION['id'])){ ?>
        <div>
            <div id='log-in-panel' class='actived'>
                <?php include COMPONENTS . "_log-in.php" ?>
                <button class='connection-button' id='sign-in-button'>Sign In</button>
            </div>
            <div id='sign-in-panel' class='disable'>
                <?php include COMPONENTS . "_sign-in.php" ?>
                <button class='connection-button' id='log-in-button'>Log In</button>
            </div>
        </div>
    <?php }else{ ?>
        <a class='connection-button' id='log-out-button' href="index.php?page=log-out">Log out</a>
        <h2>My information</h2>
        <p>
            <?= $resultFirstLastNameUser[0]["firstNameUser"] . " " . $resultFirstLastNameUser[0]["lastNameUser"] ?>
        </p>
        <h2>Update password</h2>
            <form action=<?= FORMS . "updatePassword.php" ?> method="POST" style="width: 250px; display: flex; flex-direction: column; gap: 8px;">

                <label for="newPassword">New password</label>
                <input type="password" id="newPassword" name="newPassword">

                <label for="checkNewPassword">Check new password</label>
                <input type="password" id="checkNewPassword" name="checkNewPassword">

                <input type="submit" value="Update password">

            </form>
    <?php } ?>
</main>