<?php


  if(isset($_POST['Login'])){
    header('Cache-Control: no-cache,must-revalidate',true);
    include 'conn.php';

    $username = strip_tags($_POST['username']);
    $password = strip_tags($_POST['password']);

    setcookie("UserName", $username, time() + (10 * 365 * 24 * 60 * 60), "/");

    $query = "SELECT Password FROM users where username = '$username' ";

    $result = mysqli_query($conn,$query);


    $RightPass = mysqli_fetch_row($result)[0];

    if( $RightPass == $password){
      echo "success";
      $online = "UPDATE users SET online=1 WHERE UserName='$username'";
      $result2 = mysqli_query($conn,$online);
    }
    else{
      echo "failed";
    }
  }

  
 ?>
