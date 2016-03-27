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

  // accept friend request
  if(isset($_POST['accept'])){
    include 'conn.php';

    $F = $_POST['Friend'];
    $This = $_POST['This'];

    $query = "UPDATE friend_request SET decided = '1' WHERE F='$F'";

    $add_friend = "INSERT INTO $This(Friend) VALUES('$F')";
    $add_friend2 = "INSERT INTO $F(Friend) VALUES('$This')";

    $update = mysqli_query($conn,$query);
    $result = mysqli_query($conn,$add_friend);
    $result2 = mysqli_query($conn,$add_friend2);

    if ($result && $result2) {
      # code...
      echo "success";
    }
    else {
      echo "failed";
    }

  }

  //load friends
  if(isset($_POST['load_friends'])){
    include 'conn.php';

    $user = $_POST['user'];

    $query = "SELECT Friend From $user";

    $update = mysqli_query($conn,$query);

    $users = '';

    while ($row = mysqli_fetch_assoc($update)) {
      $users.=$row['Friend'].",";
    }

    echo $users;

  }


  // handle retrivemsg
  if(isset($_POST['get'])){

    include 'conn.php';

    $name = strip_tags($_POST['name']);
    $from = strip_tags($_POST['from']);
    $time = strip_tags($_POST['time']);

    $query = "SELECT * FROM msg WHERE T='$name' AND getted=0 AND F='$from'";
    $query2 = "DELETE FROM msg WHERE getted=1";

    $result = mysqli_query($conn,$query);
    $result2 = mysqli_query($conn,$query2);

    $row = mysqli_fetch_row($result);

    $ID = $row[0];
    $msg =  $row[3];
    $update = "UPDATE msg SET getted=1 WHERE ID='$ID'";
    $updateit = mysqli_query($conn,$update);

    if($msg != ''){
      echo  $msg;
      $myfile;
      if (file_exists("../"."history/".$from."and".$name.".txt")) {
        $myfile = fopen("../"."history/".$from."and".$name.".txt", "a") or die("Unable to open file!");
      }
      else $myfile = fopen("../"."history/".$name."and".$from.".txt", "a") or die("Unable to open file!");
      if ($time !='') {
        $time_div =     "<div class='text-center'>
                        <div style='
                        margin-bottom:5px;
                        background: #434A54;
                        color: white;
                        border-radius: 20px 20px 20px 20px;
                        -moz-border-radius: 20px 20px 20px 20px;
                        -webkit-border-radius: 20px 20px 20px 20px;
                        border: 0px solid #000000;
                        opacity:0.6
                        'class='label label-default time'>".$time."</div>
                      </div>";
        fwrite($myfile,$time_div."\n");
      }
      $msg_div=        "<div class='container-fluid'>
                  <div class='row'>

                    <div style='

                      position:relative;
                      width:30px;
                      height:30px;
                      margin:20px 10px -10px 0px'class='col-md-2 user_img pull-left'>

                      <img style='position:relative; margin-left:-15px' src='./imgs/test.png' width='30px' height='30px'alt='' />
                  </div>

                    <div style='margin-top:20px;' class='col-md-2 msg-body pull-left'>
                      <p style='margin-top:5px; margin-bottom:5px; font-family:Roboto'>
                        ".$msg."
                      </p>
                    </div>
                  </div>
                </div>";
      fwrite($myfile,$msg_div."\n");
      fclose($myfile);
    }
    else echo 'none';

  }

  //check msgs
  if(isset($_REQUEST['check_msg'])){

    include 'conn.php';

    $name = $_REQUEST['check_msg'];

    $query = "SELECT F FROM msg WHERE T='$name' AND getted=0";

    $result = mysqli_query($conn,$query);

    $msgarray = '';
    while ($row = mysqli_fetch_assoc($result)) {
      $msgarray.=$row['F'].",";
    }

    echo $msgarray;
  }


  //insert msg to db
  if(isset($_POST['msg'])){

    include 'conn.php';

    $F = strip_tags($_POST['F']);
    $T = strip_tags($_POST['T']);
    $time = strip_tags($_POST['time']);

    $message = strip_tags($_POST['message']);
    $query = "INSERT INTO msg(F,T,message) VALUES('$F','$T','$message')";


    $result = mysqli_query($conn,$query);

    if ($result) {
      $myfile;
      if (file_exists("../"."history/".$T."and".$F.".txt")) {
        $myfile = fopen("../"."history/".$T."and".$F.".txt", "a") or die("Unable to open file!");
      }
      else $myfile = fopen("../"."history/".$F."and".$T.".txt", "a") or die("Unable to open file!");
      if ($time != '') {
        $time_div =     "<div class='text-center'>
                        <div style='
                        margin-bottom:5px;
                        background: #434A54;
                        color: white;
                        border-radius: 20px 20px 20px 20px;
                        -moz-border-radius: 20px 20px 20px 20px;
                        -webkit-border-radius: 20px 20px 20px 20px;
                        border: 0px solid #000000;
                        opacity:0.6
                        'class='label label-default time'>".$time."</div>
                      </div>";
        fwrite($myfile,$time_div."\n");
      }
      $message = str_replace("''","'",$message);
      $msg_div =         "<div class='container-fluid'>
                <div class='row'>

                  <div style='margin-top:20px;' class='col-md-2 msg-body pull-right'>

                    <p style='margin-top:5px; margin-bottom:5px; font-family:Roboto'>
                    ".$message."
                    </p>

                  </div>

                </div>
              </div>";
      fwrite($myfile,$msg_div."\n");
      fclose($myfile);
      echo "success";
    }
    else {
      echo "failed";
    }

  }

  //load history
  if(isset($_POST['load_history'])){

    include 'conn.php';

    $F = strip_tags($_POST['F']);
    $T = strip_tags($_POST['T']);

    if (file_exists("../"."history/".$T."and".$F.".txt")) {
      $myfile = fopen("../"."history/".$T."and".$F.".txt", "r");
      while(!feof($myfile)) {
        echo fgets($myfile);
      }
      fclose($myfile);
    }
    else if (file_exists("../"."history/".$F."and".$T.".txt")) {
      $myfile = fopen("../"."history/".$F."and".$T.".txt", "r");
      while(!feof($myfile)) {
        echo fgets($myfile);
      }
      fclose($myfile);
    }
    else {
      echo "no history";
    }



  }

 ?>
