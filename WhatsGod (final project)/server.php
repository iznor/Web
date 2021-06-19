<?php
include 'get.php';
if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'getLeaderboard':
              while ($row = mysqli_fetch_array($result)) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
            if ($result) {
                mysqli_free_result($result);
            }
            //close DB connection
            mysqli_close($connection);
            break;
        case 'play':
            $query  = "INSERT INTO users_211_GAMES (user_one_id, user_two_id) VALUES ('8','2')";
            mysqli_query($connection, $query);
            break;
    }
}
