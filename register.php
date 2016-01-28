<?php

if(isset($_POST['submit'])){
  include 'connection.php';

  $name = strip_tags($_POST['name']);
  $password = strip_tags($_POST['password']);
  $passwordConfirm = strip_tags($_POST['passwordConfirm']);

  if($name == '' || $password == '' || $passwordConfirm == ''){
    echo "
    <div id = 'Mine' class='alert alert-warning alert-dismissible'>
     <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
     <strong>Warning!</strong> Oops! No blanks left Please!
   </div>
    ";
  }
  else{

      if($password != $passwordConfirm){
        echo "
        <div id = 'Mine' class='alert alert-warning alert-dismissible'>
         <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
         <strong>Warning!</strong> Please retype your passsword!
       </div>
        ";
        //header('Location: register.php');
      }
      else{

        $query = "INSERT INTO users(Name,UserName,Password) VALUES('$name','$name','$password')";

        $result = mysqli_query($conn,$query);

        if($result){
          echo "Registion Success<br>";
          header('Location: user.php');

        }
        else{
          header('Location: register.php');
        }

      }
  }



}

 ?>

 <!DOCTYPE html>
 <html>
   <head>
     <title>Register</title>
     <link rel="stylesheet" href="/css/bootstrap.min.css" charset="utf-8"/>
     <script src="js/jquery-1.12.0.min.js" charset="utf-8"></script>
     <script src="Register.js" charset="utf-8"></script>
     <script src="js/bootstrap.min.js" charset="utf-8"></script>
   </head>
   <body>
     <div class="page-header">
       <h1 class="text-center">Register here</h1>
     </div>

     <div class="row">
         <div class="col-md-2 col-md-offset-5">
           <form method="post">
             <div class="form-group">
               <h3 class="text-center">UserName</h3>
               <input type="text" class="form-control" name="name" placeholder="Your Name"/>
             </div>
             <div class="form-group">
               <h3 class="text-center">Password</h3>
               <input type="password" class="form-control" name="password" placeholder="Your Password"/>
             </div>
             <div class="form-group">
               <h3 class="text-center">Confirm Password</h3>
               <input type="password" class="form-control" name="passwordConfirm" placeholder="Confirm Password"/>
             </div>
             <input type="Submit" class="btn btn-primary center-block" name="submit" value="Submit"/>
           </form>
         </div>
     </div>

   </body>
 </html>
