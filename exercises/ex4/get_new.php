<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        <?php
        $music = "<audio autoplay controls src='./sound/love-beitar.mp3'></audio>";
        $style = $_GET['style'];
        if ($style == 'Dark') {
            include './css/dark.css';
        } else if ($style == 'Light') {
            include './css/light.css';
        } else include './css/bj.css';
        ?>
    </style>
    <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap' rel='stylesheet'>
    <title>forms</title>
</head>
<?php
if ($style == 'B.Jerusalem') {
    echo "" . $music;
}
?>
        <?php
        $un = $_GET["name"];
        $jb = $_GET["job"];
        $pn = $_GET["phone"];
        $em = $_GET["mail"];
        $ws1n = $_GET["web1name"];
        $ws1 = $_GET["web1url"];
        $ws2n = $_GET["web2name"];
        $ws2 = $_GET["web2url"];
        ?>
<body class="wrapper">
    <section>
    </section>
    <div class="buss-card bottom">
        <div id="logo"></div>
        <div class="left">
            <p class="name"><b><?php echo "" . $un ?></b></p>
            <p class="role"><?php echo "" . $jb ?></b></p>
        </div>
        <div class="right">
            <ul>
                <li><b>Mobile:</b>&nbsp;<?php echo "" . $pn ?></li>
                <li><b>E-mail:</b>&nbsp;<?php echo "" . $em ?></li>
                <li><b><?php
                        if ($ws1n == "Other-Social") {
                            echo "Social:" . "</b>&nbsp";
                        } else
                        if ($ws1n == "Other") {
                            echo "My Link:" . "</b>&nbsp";
                        } else
                        if ($ws1n == "Professional") {
                            echo "Work:" . "</b>&nbsp";
                        } else
                            echo "" . $ws1n . ":" ?></b>&nbsp;<?php echo "" . $ws1 ?></li>
                <li><b><?php
                        if ($ws2n == "Other-Social") {
                            echo "Social:" . "</b>&nbsp";
                        } else
                        if ($ws2n == "Professional") {
                            echo "Work:" . "</b>&nbsp";
                        } else
                            echo "" . $ws2n . ":" ?></b>&nbsp;<?php echo "" . $ws2 ?></li>
            </ul>
        </div>
    </div>
    <div class="clear"></div>
    <footer>&copy;2021, Ido Dor. All rights reserved.</footer>
</body>

</html>