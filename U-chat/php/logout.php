<?php
  header('Cache-Control: no-cache,must-revalidate',true);
  include 'conn.php';

  $username = $_COOKIE['UserName'];

  $offline = "UPDATE users SET online=0 WHERE UserName='$username'";
  $result = mysqli_query($conn,$offline);

  setcookie('UserName', '', time()-700000, '/');
  header("Location: ../index.html");

  
 ?>
