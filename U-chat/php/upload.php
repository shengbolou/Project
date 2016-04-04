<?php

$tmp_name = $_FILES["file1"]["tmp_name"];
$file_name = $_FILES["file1"]["name"];
$file_extension = pathinfo("../imgs/$file_name",PATHINFO_EXTENSION);



if($file_extension!='jpg' && $file_extension!='jpeg' && $file_extension!='png' && $file_extension!='gif'){
  echo "not_img";
}

if(move_uploaded_file($tmp_name,"../imgs/$file_name")){
  echo "success";
}
else {
  echo "failed";
}







 ?>
