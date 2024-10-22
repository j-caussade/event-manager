<section id="log-in">
    <h1>Log in</h1>
    <form action=<?= FORMS . "logInValidation.php" ?> method="POST">
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
        </div>
        <div>
            <input type="submit" value="Log in">
        </div>
    </form>
</section>