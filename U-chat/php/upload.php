<?php

$tmp_name = $_FILES["file1"]["tmp_name"];
$file_name = $_FILES["file1"]["name"];

if(move_uploaded_file($tmp_name,"../imgs/$file_name")){
  echo "success";
}
else {
  echo "failed";
}







 ?>
