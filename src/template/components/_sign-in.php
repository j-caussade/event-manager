<section id="sign-in">
    <h1>Sign in</h1>
    <form action=<?= FORMS . "signInValidation.php" ?> method="POST">
        <div>
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName">
        </div>
        <div>
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName">
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
        </div>
        <div>
            <input type="submit" value="Sign in">
        </div>
    </form>
</section>