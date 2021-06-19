<?php
    include '../config.php';
    session_start();
    
    if(!$_SESSION['user_id']){
        header('Location: ' . URL . 'index.php');
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>What's God</title>
	<link rel="icon" type="image/png" sizes="16x16" href="../assets/png/whatsGod.png">
    <link rel="stylesheet/less" type="text/css" href="./css/style.less" />
    <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap' rel='stylesheet'>
</head>

<body>
    <section id="app">
        <header class="app-header">
            <h1>What'sGod</h1>
            <a href="javascript:void(0)" class="profile click">
                <img src="assets/svg/asafSmall.svg" alt="profile-avatar">
            </a>
            <nav>
                <a class="history click" href="javascript:void(0)">History</a>
                <a class="challenge click" href="javascript:void(0)">Challenge</a>
                <a class="leaderboard click" href="javascript:void(0)">Leaderboard</a>
            </nav>
        </header>
        <section id="leaderboard">
            <nav class="search-container">
                <img class="flex-icon" src="assets/svg/flex.svg" alt="flex">
                <img class="grid-icon" src="assets/svg/grid.svg" alt="grid">
                <div class="search">
                    <input type="text" placeholder="search" name="search" class="search-input">
                    <img class="search-icon" src="assets/svg/search.svg" alt="search">
                </div>
            </nav>
            <header class="leaderboard-header">
                <span>Player</span>
                <span>Score</span>
                <span>Turing Ratio</span>
            </header>
            <ol class="leaderboard-list">
            </ol>
        </section>


        <section id="challenge">
        </section>



        <p style="display: none;" id="notification">Thank You!</p>
    </section>


    <section id="customizations">
      
    </section>

    <section id="profile">
    </section>


    <section id="game">
        

    </section>

    <script src="https://cdn.jsdelivr.net/npm/less@3.13"></script>
    <script src="./js/script.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</body>

</html>

<?php

//close DB connection

mysqli_close($connection);

?>