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




   $('.carousel-inner').fadeIn(2000);
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

function login(){
  var userName = document.getElementById('username').value;
  var passWord =  document.getElementById('password').value;

  $.post('Main.php',{submit:'submit',userName:userName,password:passWord},function(data){
         data = data.split(",");
         if(userName == '' || passWord == ''){
           $('#Signin').effect('shake');
           if(userName == '') {
             $('#username').css('box-shadow','0 1px 1px red inset, 0 0 8px red');
           }
           if(passWord == ''){
             $('#password').css('box-shadow','0 1px 1px red inset, 0 0 8px red');
           }
         }
         else if(data[0] == userName && data[1] == passWord && data[2] == "1"){
           window.location="user.php";
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
      $('#usernameR').css('box-shadow','0 1px 1px red inset, 0 0 8px red');
    }
    if(passWord == ''){
      $('#password1R').css('box-shadow','0 1px 1px red inset, 0 0 8px red');
    }
    if(passWord2 == ''){
      $('#password2R').css('box-shadow','0 1px 1px red inset, 0 0 8px red');
    }
  }
  else if(passWord != passWord2){
    $('#RegisterModal').effect('shake');
  }
  else{
    $.post('Main.php',{RegisterSubmit:'yes', name:userName, password:passWord, passwordConfirm:passWord2},function(data){
      if(data == 'success'){
        window.location = "user.php";
      }
    });
  }
}
