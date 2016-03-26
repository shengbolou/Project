<?php

  include 'register.php';
  include 'login.php';
  header('Cache-Control: no-cache,must-revalidate',true);

  $UserName = $_COOKIE['UserName'];

  if(isset($_POST['UserName'])){
    echo $UserName;
  }

  if (isset($_POST['send'])) {
    include 'conn.php';

    $F = strip_tags($_POST['F']);
    $T = strip_tags($_POST['T']);


    $query = "INSERT INTO friend_request(F,T) VALUES('$F','$T')";

    $result = mysqli_query($conn,$query);

    if ($result) {
      echo "success";
    }
    else {
      echo "failed";
    }

  }

  if(isset($_REQUEST['q'])){
    include 'conn.php';

    $request = $_REQUEST['q'];

    if($request != ''){
      $query = "SELECT UserName FROM users";

      $result = mysqli_query($conn,$query);

      $length = strlen($request);

      while ($row = mysqli_fetch_assoc($result)) {

        if($length > strlen($row["UserName"])){
          continue;
        }

        if (stristr($request, substr($row["UserName"],0,$length))) {
          echo "<a id='".$row["UserName"]."' onclick='friend(this.id)' class='list-group-item'>".$row["UserName"]."</a>";
        }

      }

    }
  }

  if(isset($_REQUEST['request'])){
    include 'conn.php';

      $request = $_REQUEST['request'];
      $query = "SELECT F FROM friend_request WHERE T='$request'";

      $result = mysqli_query($conn,$query);

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
