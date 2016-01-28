<?php

if(isset($_POST['submit'])){

  header('Cache-Control: no-cache,must-revalidate',true);

  include_once 'connection.php';
  $username = strip_tags($_POST['userName']);
  $password = strip_tags($_POST['password']);

  $query ="SELECT Password FROM users WHERE UserName = '$username'";

  $result = mysqli_query($conn,$query);

  $row = $result->fetch_array(MYSQLI_BOTH);

  if($result){
    $RightPass = $row['Password'];
  }

  if($password == $RightPass && $password!=""){
    $_SESSION['userName'] = $username;
    $_SESSION['password'] = $password;
    header('Location: user.php');
    exit();
  }
  else{
    header('Location: index.php');
  }

}

 ?>

 <!DOCTYPE html>
 <html>
 <header>
   <title>login</title>
   <link rel="stylesheet" href="/css/bootstrap.min.css" charset="utf-8"/>
   <link rel="stylesheet" href="index.css" charset="utf-8">
 </header>


 <body>
   <div class="page-header text-center">
     <h1>Login <br><small>Enter your name and password</small></h1>
   </div>

<div class="row">
  <div class="col-md-2 col-md-offset-5">
    <form method="post">
      <div class="form-group">
        <h3 class="text-center">You Name</h3>
        <input type="text" class="form-control" placeholder="UserName" name="userName"/>
      </div>
      <div class="form-group">
        <h3 class="text-center">Password</h3>
        <input type="password" class="form-control" placeholder="Password" name="password"/><br>
      </div>
      <input type="Submit" class="btn btn-primary center-block" name = "submit" value="login"/>
    </form>
  </div>
</div>




 </body>

 </html>
