<?php


// $Myname = "Vincent";
//
// function test(){
//  global $Myname;
//   echo $Myname;
// }
// class Person{
//   function Person($input){
//     $this->Name = $input;
//   }
// }
//
// $x = new Person("Vinc");
//
// echo $x->Name;

$serverName = "localhost";
$userName = "root";
$password = "loushengbo123";

//connect
$connect = mysqli_connect($serverName,$userName,$password);

if(!$connect){
  die('Error');
}
else echo "Connected<br>";


//select database
$db = mysqli_select_db($connect,'db');

if(!$db){
  die('Error');
}
else echo "db Selected<br>";

$query = "select * from users";

$result = mysqli_query($connect,$query);


while ($Name = $result->fetch_array(MYSQLI_BOTH)) {
  echo "<h3>", $Name["Name"],"<h3>";
}




?>
