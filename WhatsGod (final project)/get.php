<?php

//create a mySQL DB connection:
$dbhost = "**********";
$dbuser = "**********";
$dbpass = "**********!";
$dbname = "**********";
$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

//testing connection success:
if (mysqli_connect_errno()) {

    die("DB connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")");
};

//getting data from db
$get_all = "SELECT a.user_avatar, a.email, a.user_id, a.username, b.turing, b.games_played, b.customization, b.rank, b.exp, b.position, b.games_won, b.score FROM `users_211_USERS` a inner join `users_211_USER_STATS` b on a.user_id=b.user_id";
$result = mysqli_query($connection, $get_all);
if (!$result) {
    echo 'Could not run query: ' . mysqli_connect_errno();
    exit;
}
?>