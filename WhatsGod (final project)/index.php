<?php

include 'get.php';

include 'config.php';


session_start(); //on logout session_destroy();

if (!empty($_POST["loginUsername"])) { //true if form was submitted

    $query  = "SELECT * FROM users_211_USERS WHERE username='"

        . $_POST["loginUsername"]

        . "' and password = '"

        . $_POST["loginPass"]

        . "'";

    // echo $query;//can't start echo if header comes after it



    $result = mysqli_query($connection, $query);

    $row    = mysqli_fetch_array($result);



    if (is_array($row)) {

        $_SESSION["user_id"] = $row['user_id'];

        header('Location: ' . URL . 'WhatsGod/index.php');
    } else {

        $message = "Invalid Username or Password!";
    }
}

?>

<!DOCTYPE html>

<html>

<head>

    <meta charset="utf-8">

    <title>WhatsGod</title>

    <link rel="stylesheet" href="./css/style.css">

    <link rel="icon" type="image/png" sizes="16x16" href="assets/png/whatsGod.png">


</head>

<body>
<?php
    if (!empty($_POST["reg-username"])) { //true if form was submitted

        $query  = "INSERT INTO users_211_USERS (username, password, email) VALUES ('". $_POST["reg-username"]."','". $_POST["reg-pass"]."','". $_POST["reg-mail"]."')";

        if (mysqli_query($connection, $query)) {
            echo "<h1>Username&nbsp;<b> " . $_POST["reg-username"]. "</b>&nbsp;is created! You can now login :)</h1>";
        }
    };
?>

    <div class="wrapper">
        <br>
        <span id="logo"></span>
        <h1>WhatsGod</h1>
        <form id="login" name="login" action="#" method="post" target="dummyframe">
            <br>
            <label for="loginUsername">Username: </label>
            <input type="text" name="loginUsername" id="loginUsername" title="Legal Digits: [A-Z],[a-z],[0-9]" autocomplete required placeholder="Enter Username">
            <label for="loginPass">Password: </label>
            <input type="password" required name="loginPass" id="loginPass" placeholder="Enter Password">
            <br>
            <a id="forgot" href="#">Forgot Your Password ?</a>
            <br>
            <input class="submit" type="submit" name="submit" value="login">
            <div class="error-message">
            <?php 
                if (isset($message)) {
                  echo $message;
                  } 
            ?>
                </div>
        </form>
        <br>
        <h4>New to WhatsGod?!</h4>
        <br>
        <button id="new-user">Create New Account</button>
        <br>
        <br>
        <form id="reg-form" name="register" action="#" method="post" target="dummyframe">
            <!-- onClick Show: -->
            <label for="reg-username">Username: </label>
            <input type="text" name="reg-username" title="Legal Digits: [A-Z],[a-z],[0-9], '.', '-'" autocomplete placeholder="Enter Username" required>
            <label for="reg-mail">E-mail: </label>
            <input type="email" name="reg-mail" autocomplete required placeholder="Enter E-mail">
            <label for="reg-pass">Password: </label>
            <input type="password" name="reg-pass" autocomplete required placeholder="Enter Password">
            <br>
            <input class="submit" type="submit" name="submit" value="register">
            <!-- End Show -->
            <br>
        </form>
    </div>
    <footer>&copy;2021, Ido Dor & Ohad Baehr. All rights reserved.</footer>
    <script src="./js/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/less@3.13"></script>

</body>

</html>

<?php

//close DB connection

mysqli_close($connection);

?>