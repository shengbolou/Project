<?php

$tmp_name = $_FILES["file1"]["tmp_name"];
$file_name = $_FILES["file1"]["name"];
$file_extension = $_FILES["file1"]["type"];

if (!$tmp_name) {
  echo "file not exist";
  exit();
}


if($file_extension!='application/jpg' && $file_extension!='application/jpeg' && $file_extension!='application/png' && $file_extension!='application/gif'){
  echo "type_error";
}

if(move_uploaded_file($tmp_name,"../imgs/$file_name")){
  echo "success";
}
else {
  echo "failed";
}







 ?>
