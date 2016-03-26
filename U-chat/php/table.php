<?php

include 'conn.php';

$servername = "localhost";
$username = "root";
$password = "loushengbo123";


// sql to create table
$sql = "CREATE TABLE friend_request(
ID int NOT NULL AUTO_INCREMENT,
F varchar(255) NOT NULL,
T varchar(255) NOT NULL,
decided BOOLEAN DEFAULT 0,
PRIMARY KEY(ID)
)";

mysqli_query($conn,$sql);

mysqli_close($conn);

?>
