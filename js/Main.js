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
      pause:'active'
   });


   $('#t1').hover(
     function(){
     $(this).find('.hover').show('fade',500);
     $(this).find('.t1h').css('transform','translatey(0)');
     $(this).find('img').css('transform','scale(1.1)');
   },function(){
     $(this).find('.hover').hide('fade',500);
     $(this).find('.t1h').css('transform','translatey(-110px)');
     $(this).find('img').css('transform','scale(1)');
   });
   $('#t2').hover(
     function(){
     $(this).find('.t2h').css('transform','translatey(-10px)');
     $(this).find('.t2h').css('background','#6B868D');
     $(this).find('.hover2').css('background','#00586E');
     $(this).find('.hover2').fadeTo(400,0.5);
     $(this).find('#t2b').css('transform','scale(1)');
     $(this).find('img').css('transform','scale(1.1)');
   },function(){
      $(this).find('.t2h').css('transform','translatey(30px)');
      $(this).find('.hover2').css('background','#5C5959');
      $(this).find('.t2h').css('background','black');
      $(this).find('.hover2').fadeTo(400,0.7);
      $(this).find('#t2b').css('transform','scale(0)');
     $(this).find('img').css('transform','scale(1)');
   });
   $('#t3').hover(
     function(){
      $(this).find('.hover3').css('transform','translate(0,0)');
      $(this).find('#t3b').css('transform','translatey(0)');
      $(this).find('#t3b').css('transition-delay','0.3s');
      $(this).find('.hover3').css('transition-delay','0s');
      $(this).find('img').css('transform','scale(1.1)');
   },function(){
     $(this).find('#t3b').css('transform','translatey(-800px)');
     $(this).find('#t3b').css('transition-delay','0s');
    $(this).find('.hover3').css('transform','translate(300px,-300px) rotate(180deg)');
    $(this).find('.hover3').css('transition-delay','0.3s');
     $(this).find('img').css('transform','scale(1)');
   });
   $('#t4').hover(
     function(){
       $(this).find('.hover4').css('transform','translate3d(0,0,0)');
       $(this).find('.hover4').css('transition-delay','0s');
       $(this).find('.hover4').css('opacity','0.7');
       $(this).find('hr').css('width','80%');
       $(this).find('hr').css('transition-delay','0.5s');
       $(this).find('#t4b').css('transform','translatex(0)');
       $(this).find('#t4b').css('transition-delay','0.8s');
       $(this).find('img').css('transform','scale(1.1)');
   },function(){
      $(this).find('#t4b').css('transform','translatex(-400px)');
      $(this).find('#t4b').css('transition-delay','0.8s');
       $(this).find('hr').css('width','0');
       $(this).find('hr').css('transition-delay','0.5s');
       $(this).find('.hover4').css('transform','translate3d(-100%,0,0)');
       $(this).find('.hover4').css('transition-delay','1s');
      $(this).find('img').css('transform','scale(1)');
   });



   $("#mythumbnail").fadeIn(2000);
   $('.carousel-inner').fadeIn(2000);
   $('.carousel-inner').css('height',window.innerHeight);
   $('.carousel-indicators').fadeIn(2000);
   $("#login").fadeIn(2000);
   $(".header").fadeIn(1000);
   $("#header").fadeIn(1000);
   $("#h2").fadeIn(1000);
   $("#register").fadeIn(2000);
   $("#Home").fadeIn(2000);

   $("#Home").click(function(){
        window.location="Main.html";
    });

});


//back-end stuff
function login(){
  var userName = document.getElementById('username').value;
  var passWord =  document.getElementById('password').value;

  $.post('Main.php',{submit:'submit',userName:userName,password:passWord},function(data){
         data = data.split(",");
         if(userName == '' || passWord == ''){
           $('#Signin').effect('shake');
           if(userName == '') {
             $('#userdiv').addClass('has-error');
           }
           if(passWord == ''){
             $('#passworddiv').addClass('has-error');
           }
         }
         else if(data[0] == userName && data[1] == passWord && data[2] == "1"){
           window.location="user.html";
         }
         else{
           $('#Signin').effect('shake');
         }
  });
};

function register(){
  var userName = document.getElementById('usernameR').value;
  var passWord =  document.getElementById('password1R').value;
  var passWord2 =  document.getElementById('password2R').value;

  if(userName == '' || passWord == '' || passWord2 == ''){
    $('#RegisterModal').effect('shake');
    if(userName == ''){
      $('#userdivR').addClass('has-error');
    }
    if(passWord == ''){
      $('#passworddivR1').addClass('has-error');
    }
    if(passWord2 == ''){
      $('#passworddivR2').addClass('has-error');
    }
  }
  else if(passWord != passWord2){
    $('#RegisterModal').effect('shake');
  }
  else{
    $.post('Main.php',{RegisterSubmit:'yes', name:userName, password:passWord, passwordConfirm:passWord2},function(data){
      if(data == 'success'){
        window.location = "user.html";
      }
    });
  }
}
