
<?php

if(isset($_POST['Sign'])){
  header('Cache-Control: no-cache,must-revalidate',true);
  include 'conn.php';
  $username = strip_tags($_POST['username']);
  $email = strip_tags($_POST['email']);
  $password = strip_tags($_POST['password']);

  setcookie("UserName", $username, time()+6000, "/");
  $check_duplicate = "SELECT * FROM users where UserName = '$username'";
  $result2 = mysqli_query($conn,$check_duplicate);
  if($result2){
    if(count(mysqli_fetch_assoc($result2))>0)
      echo "duplicate";
    else {
      $query = "INSERT INTO users(UserName,Password,email) VALUES ('$username','$password','$email')";

      $result = mysqli_query($conn,$query);

      if($result){
        echo "success";
      }
    }
  }


}

?>
