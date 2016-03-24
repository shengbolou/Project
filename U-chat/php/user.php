<?php

  include 'register.php';
  include 'login.php';
  header('Cache-Control: no-cache,must-revalidate',true);

  $UserName = $_COOKIE['UserName'];

  if(isset($_POST['UserName'])){
    echo $UserName;
  }


  if(isset($_POST['get'])){

    include 'conn.php';

    $name = strip_tags($_POST['name']);

    $query = "SELECT * FROM msg WHERE T='$name' AND getted=0";

    $result = mysqli_query($conn,$query);

    $row = mysqli_fetch_row($result);

    $ID = $row[0];
    $msg =  $row[3];
    $update = "UPDATE msg SET getted=1 WHERE ID='$ID'";
    $updateit = mysqli_query($conn,$update);
    if($msg != '')
    echo  $msg;
    else echo 'none';



  }


  if(isset($_POST['msg'])){

    include 'conn.php';

    $F = strip_tags($_POST['F']);
    $T = strip_tags($_POST['T']);
    $message = strip_tags($_POST['message']);

    $query = "INSERT INTO msg(F,T,message) VALUES('$F','$T','$message')";

    $result = mysqli_query($conn,$query);

    if ($result) {
      echo "success";
    }
    else {
      echo "failed";
    }

  }




 ?>
