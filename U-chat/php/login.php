<?php


  if(isset($_POST['Login'])){
    header('Cache-Control: no-cache,must-revalidate',true);
    include 'conn.php';

    $username = strip_tags($_POST['username']);
    $password = strip_tags($_POST['password']);

    setcookie("UserName", $username, time()+6000, "/");

    $query = "SELECT Password FROM users where username = '$username' ";

    $result = mysqli_query($conn,$query);


    $RightPass = mysqli_fetch_row($result)[0];


    if( $RightPass == $password){
      echo "success";
    }
    else{
      echo "failed";
    }




  }








 ?>