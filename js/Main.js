$(document).ready(function(){


   $('#login').hover(function(){
     $('#login').fadeTo(500,1).css('box-shadow','2px 2px 20px white');
   },function(){
     $('#login').fadeTo(500,0.6).css('box-shadow','none');
   })

   $('#register').hover(function(){
     $('#register').fadeTo(500,1).css('box-shadow','2px 2px 20px white');
   },function(){
     $('#register').fadeTo(500,0.6).css('box-shadow','none');
   })


   $('#Home').hover(function(){
     $('#Home').fadeTo(500,1).css('box-shadow','2px 2px 20px white');
   },function(){
     $('#Home').fadeTo(500,0.6).css('box-shadow','none');
   })

   $('.carousel').carousel({
      pause:'focus'
   });


   $('.carousel-inner').fadeIn(2000);
   $('.carousel-indicators').fadeIn(2000);
   $("#login").fadeIn(2000);
   $(".header").fadeIn(1000);
   $("#header").fadeIn(1000);
   $("#h2").fadeIn(1000);
   $("#register").fadeIn(2000);
   $("#Home").fadeIn(2000);

   $("#Home").click(function(){
        window.location="Main.php";
    });
    // $('#login').click(function(){
    //     window.location="index.php";
    // });
    $('#register').click(function(){
        window.location="Register.php";
    });


});
