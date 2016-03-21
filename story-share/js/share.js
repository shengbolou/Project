$(document).ready(function(){

});

function Sign_in(){
  var username = document.getElementById('s_username').value;
  var email = document.getElementById('s_email').value;
  var password = document.getElementById('s_password').value;
  var rpassword = document.getElementById('s_r_password').value;
 if(username == ''|| email == '' || password == '' || rpassword == ""){
    $('#sign-in-modal').velocity("callout.shake");

    if(username == ''){
      $('#s_username').parent().addClass('has-error');
    }
    if(email == ''){
      $('#s_email').parent().addClass('has-error');
    }
    if(password == ''){
      $('#s_password').parent().addClass('has-error');
    }
    if(rpassword == ''){
      $('#s_r_password').parent().addClass('has-error');
    }
  }
  else if(password != rpassword){
    $('#sign-in-modal').velocity("callout.shake");
    $('#s_password').parent().addClass('has-error');
    $('#s_r_password').parent().addClass('has-error');
  }
  else{
    $.post('./php/index.php',{Sign:'yes',username:username,email:email,password:password},function(data){
      if(data == 'success'){
        window.location="User.html"
      }
    });
  }
}
