<?php

include 'conn.php';
$servername = "localhost";
$username = "root";
$password = "loushengbo123";


//create database share
$db = "CREATE DATABASE share";

//create friend_request table
$friend_request =
"CREATE TABLE friend_request(
ID int NOT NULL AUTO_INCREMENT,
F varchar(255) NOT NULL,
T varchar(255) NOT NULL,
decided BOOLEAN DEFAULT 0,
PRIMARY KEY(ID)
)";

// create users table
$users =
"CREATE TABLE users(
  ID int NOT NULL AUTO_INCREMENT,
  UserName varchar(255) NOT NULL,
  Password varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  url varchar(255) DEFAULT 'imgs/user.png',
  info TEXT NOT NULL,
  online BOOLEAN DEFAULT 0,
  PRIMARY KEY(ID)
)";

$friend_table=
"CREATE TABLE friends(
  ID int NOT NULL AUTO_INCREMENT,
  user_one varchar(255) NOT NULL,
  user_two varchar(255) NOT NULL,
  PRIMARY KEY(ID)
)";


//create msg table
$msg =
"CREATE TABLE msg(
  ID int NOT NULL AUTO_INCREMENT,
  F varchar(255) NOT NULL,
  T varchar(255) NOT NULL,
  message longtext NOT NULL,
  getted BOOLEAN DEFAULT 0,
  PRIMARY KEY(ID)
)";

mysqli_query($conn,$db);
mysqli_query($conn,$friend_request);
mysqli_query($conn,$users);
mysqli_query($conn,$msg);
mysqli_query($conn,$friend_table);


mysqli_close($conn);

?>
