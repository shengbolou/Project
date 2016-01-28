
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title>Main</title>
     <link rel="stylesheet" href="/css/bootstrap.min.css"charset="utf-8"/>
     <link rel="stylesheet" href="Main.css" charset="utf-8">
     <script src="js/jquery-2.2.0.min.js"></script>
     <script src="js/bootstrap.min.js" charset="utf-8"></script>
     <script src="js/Main.js"></script>
   </head>
   <body>

     <div class="page-header text-center">

       <div class="header">
       </div>

       <div class="headerContainer">
         <h1 id="header">Home page</h1>
       </div>

       <input id='Home' class="btn btn-success" type="Submit" name="Home" value="Home"/>
       <input id='login' type="Submit" class="btn btn-primary" name="login" value="login"/>
       <input id='register' type="Submit" class="btn btn-primary" name="register" value="Register"/>

     </div>

     <div id = "mycarousel" class="carousel slide" data-ride="carousel">

       <ol class="carousel-indicators">
         <li data-target="#mycarousel" data-slide-to="0" class="active"></li>
         <li data-target="#mycarousel" data-slide-to="1"></li>
         <li data-target="#mycarousel" data-slide-to="2"></li>
       </ol>
       <div class="carousel-inner" role="listbox">
         <div id="imgs" class="item active">
           <img src="imgs/wedding4.jpg" />
         </div>
         <div id="imgs" class="item">
           <img src="imgs/wedding2.jpg"/>
         </div>
         <div id="imgs" class="item">
           <img src="imgs/wedding3.jpg" />
         </div>
       </div>

     </div>

   </body>
 </html>
