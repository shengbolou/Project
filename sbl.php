<?php


if(isset($_POST['Go'])){
  header('Cache-Control: no-cache,must-revalidate',true);
  include 'connection.php';

  $lastname = strip_tags($_POST['lastname']);
  $firstname = strip_tags($_POST['firstname']);
  $email = strip_tags($_POST['email']);
  $msg = strip_tags($_POST['msg']);


  $new_msg = str_replace("'","''",$msg);

  $query = "INSERT INTO sbl(lastname,firstname,email,msg) VALUES ('$lastname', '$firstname', '$email', '$new_msg')";




  $result = mysqli_query($conn,$query);

  if($result){
    echo "success";
  }

}


 ?>
