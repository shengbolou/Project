$(document).ready(function(){

  $(document).keypress(function(event){

    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == '13'){
      if(!$('#log_in_modal').hasClass('in')){
        $('#Log_in').click()
      }
      if(!$('#sign_in_modal').hasClass('in')){
        $('#Sign_in').click()
      }
    }

  });

  $('#dismiss').click(function(){
    $('.failed').velocity("fadeOut",200);
  });
  $('#dismiss2').click(function(){
    $('.failed2').velocity("fadeOut",200);
  });
  $.post('php/table.php');

  $('.main').velocity({
    translateY: '5px'
  },{loop:true,duration:1000}).velocity('reverse');
});

//regedx check email format
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function Sign_in(){
  var username = document.getElementById('s_username').value;
  var email = document.getElementById('s_email').value;
  var password = document.getElementById('s_password').value;
  var rpassword = document.getElementById('s_r_password').value;
 if(username == ''|| email == '' || password == '' || rpassword == ""){
   $('input').val('');
    $('#sign-in-modal').stop(true,true).velocity("callout.shake",350);
    document.getElementById('message2').innerHTML = "No blanks";
    $('.failed2').velocity("fadeIn",200);
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
    $('input').val('');
    $('input').parent().removeClass('has-error');
    $('#sign-in-modal').stop(true,true).velocity("callout.shake",350);
    $('#s_password').parent().addClass('has-error');
    $('#s_r_password').parent().addClass('has-error');
    document.getElementById('message2').innerHTML = "Two passwords don't match";
    $('.failed2').velocity("fadeIn",200);
  }
  else if(!validateEmail(email)){
    $('#s_username').popover('hide');
    $('input').parent().removeClass('has-error');
    $('#sign-in-modal').stop(true,true).velocity("callout.shake",350);
    $('#s_email').parent().addClass('has-error');
    $('#s_email').popover('show');
  }
  else{
    $.post('php/register.php',{Sign:'yes',username:username,email:email,password:password},function(data){
      switch (data.substring(2)) {
        case "success":
          window.location="User.html";
          break;
        case "duplicate":
          $('#s_email').popover('hide');
          $('#sign-in-modal').stop(true,true).velocity("callout.shake",350);
          $('input').parent().removeClass('has-error');
          $('#s_username').parent().addClass('has-error');
          $('#s_username').popover('show');
          break;
      }
    });
  }
}

function Log_in(){
  var username = document.getElementById('l-username').value;
  var password = document.getElementById('l-password').value;

  if(username == '' || password == ''){
    $('#log-in-modal').stop(true,true).velocity("callout.shake",350);
    document.getElementById('message').innerHTML = "No blanks";
    $('.failed').velocity("fadeIn",200);

    if (username == '') {
      $('#l-username').parent().addClass('has-error');
    }
    if (password == '') {
      $('#l-password').parent().addClass('has-error');
    }
  }
  else {
    $.post('php/login.php',{Login:'yes',username:username, password:password},function(data){
      switch (data) {
        case "success":
          window.location='User.html';
          break;
        case 'failed':
        $('input').val('');
        $('#l-username').parent().addClass('has-error');
        $('#l-password').parent().addClass('has-error');
        $('#log-in-modal').stop(true,true).velocity("callout.shake",350);
        document.getElementById('message').innerHTML = "username or password wrong!";
        $('.failed').velocity("fadeIn",200);
      }
    });
  }
}
