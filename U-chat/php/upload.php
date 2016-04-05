<?php


if (isset($_FILES['file1'])) {

  header('Cache-Control: no-cache,must-revalidate',true);

  $user = $_REQUEST['user'];
  $tmp_name = $_FILES["file1"]["tmp_name"];
  $file_name = $_FILES["file1"]["name"];
  $file_extension = $_FILES["file1"]["type"];
  $file_size = $_FILES["file1"]["size"];

  if (!$tmp_name) {
    echo "file not exist";
  }

  else if($file_size > 1048576){
    echo "file too large";
  }

  else if($file_extension!='image/jpg' && $file_extension!='image/jpeg' && $file_extension!='image/png' && $file_extension!='image/gif'){
    echo "type_error";
  }

  else{

    move_uploaded_file($tmp_name,"../imgs/$user.png");


    include 'conn.php';

    $query = "UPDATE users SET url='imgs/$user.png' WHERE UserName='$user'";

    $result = mysqli_query($conn,$query);

    if ($result) {
      # code...
      echo "success";
    }
    else {
      echo "query error";
    }

  }


}

else {
  echo "no file";
}





 ?>
