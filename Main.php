<?php

// for login
if(isset($_POST['submit'])){

  header('Cache-Control: no-cache,must-revalidate',true);

  include_once 'connection.php';
  $username = strip_tags($_POST['userName']);
  $password = strip_tags($_POST['password']);

  $query ="SELECT Password,UserName FROM users WHERE UserName = '$username'";

  $result = mysqli_query($conn,$query);

  $row = $result->fetch_array(MYSQLI_BOTH);

  if($result){
    $RightPass = $row['Password'];
    $RightName = $row['UserName'];
    if($RightName == "" || $RightPass == ""){
      $validate = '0';
    }
    else{
      $validate = '1';
    }
    echo $RightName.",".$RightPass.",".$validate;
  }
}

// for register
if(isset($_POST['RegisterSubmit'])){
  include 'connection.php';

  $name = strip_tags($_POST['name']);
  $password = strip_tags($_POST['password']);
  $passwordConfirm = strip_tags($_POST['passwordConfirm']);


  $query = "INSERT INTO users(Name,UserName,Password) VALUES('$name','$name','$password')";

  $result = mysqli_query($conn,$query);

  if($result){
    echo "success";
  }
}


 ?>
