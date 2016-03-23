$(document).ready(function(){

  $(document).keypress(function(event){

    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == '13'){
        $('#submit').click();
    }

  });


  $.post('php/user.php',{UserName:'yes'},function(data){
    $('#header').append(data);
  });

  retrivemsg();

})

function retrivemsg(){
  $.post('php/user.php',{UserName:'yes'},function(data){
    $.post('php/user.php',{get:'yes',name:data.charAt(2)},function(data2){
      if(data2!='')
      $('.panel-body').append('<h6>'+data2+'<h6>');
    });
  });
  setTimeout(retrivemsg, 1000);
}

function Submit(){


  var message  = document.getElementById("msg").value;
  var F = document.getElementById("header").innerHTML.toLowerCase();
  $('#msg').val('');
  if(message == ''){
    $('#msg').parent().addClass('has-error');
  }
  else{
    if(F.charAt(2).toLowerCase() == 'b') var name='a';
    else var name= 'b';
    $.post('php/user.php',{msg:'yes', F:F.charAt(2), T:name, message:message.replace("'","''")},function(data){
      $('.panel-body').append('<h6 style="height:20px;width:100%"class="text-right">'+message+'<h6>');
    });
  }
}
