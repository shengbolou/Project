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

  // search friends
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

  // query friend requests
  if(isset($_REQUEST['request'])){
    include 'conn.php';

    $request = $_REQUEST['request'];
    $query = "SELECT F FROM friend_request WHERE T='$request' AND decided = '0'";

    $result = mysqli_query($conn,$query);

    $count = 0;
    while ($rows = mysqli_fetch_assoc($result)) {
      $count++;
    }
    if($count>0)
        echo $count;
    else {
      echo '';
    }
  }

  // load friend request
  if(isset($_REQUEST['load'])){
    include 'conn.php';

    $request = $_REQUEST['load'];
    $query = "SELECT F FROM friend_request WHERE T='$request' AND decided = '0'";

    $result = mysqli_query($conn,$query);

    $msg='';

    while ($row = mysqli_fetch_assoc($result)) {
      $msg.= $row['F'].',';
    }

    echo $msg;
  }

  //cancel friend request
  if(isset($_POST['cancel'])){
    include 'conn.php';

    $F = $_POST['F'];

    $query = "UPDATE friend_request SET decided = '1' WHERE F='$F'";

    if ($result = mysqli_query($conn,$query)) {
      echo "success";
    }
    else {
      echo "failed";
    }

  }


  // handle retrivemsg
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
