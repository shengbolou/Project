<?php

  include 'register.php';
  include 'login.php';
  header('Cache-Control: no-cache,must-revalidate',true);

  if (isset($_COOKIE['UserName'])) {
    # code...
    $UserName = $_COOKIE['UserName'];
  }
  else {
    $UserName = '';
  }

  if(isset($_POST['UserName'])){
    echo $UserName;
  }

  if (isset($_POST['send'])) {
    include 'conn.php';

    $F = strip_tags($_POST['F']);
    $T = strip_tags($_POST['T']);

    $check_duplicate = "SELECT * FROM friend_request WHERE F='$F' AND T='$T'";

    $duplicate = mysqli_query($conn,$check_duplicate);

    $already_friends = "SELECT Friend FROM `$F` WHERE Friend='$T'";

    $already_friends_result = mysqli_query($conn,$already_friends);

    if(count(mysqli_fetch_assoc($already_friends_result))>0){
      echo "already friends";
    }
    else if (count(mysqli_fetch_assoc($duplicate))>0) {
      echo "already sent";
    }
    else {
      # code...
      $query = "INSERT INTO friend_request(F,T) VALUES('$F','$T')";

      $result = mysqli_query($conn,$query);


      if ($result) {
        echo "success";
      }
      else {
        echo "failed";
      }
    }


  }

  //set photo
  if (isset($_POST['set_photo'])) {
    include 'conn.php';

    $user = strip_tags($_POST['user']);
    $url = strip_tags($_POST['url']);


    $query = "UPDATE users SET url='$url' WHERE UserName='$user'";

    $result = mysqli_query($conn,$query);

    if ($result) {
      # code...
      echo "success";
    }
    else {
      echo "failed";
    }

  }

  //load photo
  if (isset($_POST['load_user_photo'])) {
    include 'conn.php';

    $user = strip_tags($_POST['user']);


    $query = "SELECT url FROM users WHERE UserName='$user'";

    $result = mysqli_query($conn,$query);

    if ($result) {
      $url = mysqli_fetch_assoc($result)["url"];
      if ($url != "0") {
        echo $url;
      }
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
      $query = "SELECT * FROM users";

      $result = mysqli_query($conn,$query);

      $length = strlen($request);

      $has_result = 0;

      while ($row = mysqli_fetch_assoc($result)) {

        if($length > strlen($row["UserName"])){
          continue;
        }

        if (stristr($request, substr($row["UserName"],0,$length))) {
          $info = $row['info'];

          if ($info == '') {
            $info = "Didn't say anything";
          }

          $has_result = 1;
          echo "<a data-template='"
          .'<div style="width:150px"class="popover" role="tooltip">
            <div class="arrow">
            </div>
            <h3 class="popover-title">
            </h3>
            <img style="
              border-radius: 200px 200px 200px 200px;
              -moz-border-radius: 200px 200px 200px 200px;
              -webkit-border-radius: 200px 200px 200px 200px;
              margin-top:10px;
              margin-bottom:5px"
              class="center-block" src="'.$row['url'].'" width="50px" height="50px">
            <p class="popover-content" align="center">
            </p>
          </div>'."'".'
          data-placement="right"
          data-trigger="hover"
          data-container="body"
          data-toggle="popover"
          title="'.$row['UserName'].'"
          data-content="'.$info.'" id="'.$row["UserName"].'"'."onclick='friend(this.id)' onmouseover='detail(this.id)' class='list-group-item'>".$row["UserName"]."</a>";
        }

      }

      if($has_result == 0) {
        echo "<div class='list-group-item'>No result</div>";
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

    $add_friend = "INSERT INTO `$This`(Friend) VALUES('$F')";
    $add_friend2 = "INSERT INTO `$F`(Friend) VALUES('$This')";

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

    $query = "SELECT `$user`.Friend, users.info, users.url FROM `$user` LEFT JOIN users ON `$user`.Friend=users.UserName";

    $update = mysqli_query($conn,$query);

    $users = '';

    while ($row = mysqli_fetch_assoc($update)) {
      $users.= $row['Friend'].",".$row['info'].",".$row['url'].",";
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
    $clean_msg = "DELETE FROM msg WHERE getted=1";
    $clean_request = "DELETE FROM friend_request WHERE decided=1";
    $photo_url = "SELECT url FROM users WHERE UserName='$from'";

    $result = mysqli_query($conn,$query);
    $result2 = mysqli_query($conn,$clean_msg);
    $result3 = mysqli_query($conn,$clean_request);
    $url = mysqli_query($conn,$photo_url);

    $row = mysqli_fetch_row($result);
    $url_row = mysqli_fetch_assoc($url)['url'];

    $ID = $row[0];
    $msg =  $row[3];
    $update = "UPDATE msg SET getted=1 WHERE ID='$ID'";
    $updateit = mysqli_query($conn,$update);

    if($msg != ''){
      echo  $msg."^&^".$url_row;
      $myfile = fopen("../"."history/".$name."to".$from.".txt", "a") or die("Unable to open file!");
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
                      margin:20px 10px -10px 0px'class='col-md-2 friend_photo pull-left'>

                      <img style='position:relative; margin-left:-15px' src='".$url_row."' width='30px' height='30px'alt='' />
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

    $query = "SELECT DISTINCT msg.F,users.url FROM msg LEFT JOIN users ON msg.F=users.UserName WHERE msg.T='$name' AND msg.getted=0";

    $result = mysqli_query($conn,$query);

    $msgarray = '';
    while ($row = mysqli_fetch_assoc($result)) {
      $msgarray.=$row['F'].",".$row['url'].",";
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
      $myfile = fopen("../"."history/".$F."to".$T.".txt", "a") or die("Unable to open file!");
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

    if (file_exists("../"."history/".$F."to".$T.".txt")) {
      $myfile = fopen("../"."history/".$F."to".$T.".txt", "r");
      while(!feof($myfile)) {
        echo fgets($myfile);
      }
      fclose($myfile);
    }
    else {
      echo "no history";
    }



  }

  //check online states
  if (isset($_REQUEST['check_online'])) {
    include 'conn.php';

    $user = $_REQUEST['check_online'];

    $query = "SELECT `$user`.Friend, users.online FROM `$user` LEFT JOIN users ON `$user`.Friend=users.UserName";

    $update = mysqli_query($conn,$query);

    $users = '';

    while ($row = mysqli_fetch_assoc($update)) {
      $users.=($row['Friend'].",".$row['online'].",");
    }

    echo $users;


  }

  //function to upload info
  if (isset($_POST['info'])) {
    # code...
    include 'conn.php';

    $user = strip_tags($_POST['user']);
    $info = str_replace("'","''",strip_tags($_POST['info']));

    $query = "UPDATE users SET info='$info' WHERE UserName='$user'";

    $result = mysqli_query($conn,$query);

    if ($result) {
      echo "success";
    }
    else {
      echo "failed";
    }
  }



 ?>
