<?php

if(isset($_POST['Sign'])){
  header('Cache-Control: no-cache,must-revalidate',true);
  include 'conn.php';

  $username = strip_tags($_POST['username']);
  $email = strip_tags($_POST['email']);
  $password = strip_tags($_POST['password']);


  $query = "INSERT INTO users(UserName,Password,email) VALUES ('$username','$password','$email')";

  $result = mysqli_query($conn,$query);

  if($result){
    echo "success";
  }

}













 ?>
