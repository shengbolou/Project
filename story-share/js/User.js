$(document).ready(function(){
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
  var F = document.getElementById("header").innerHTML;

  if(message == ''){
    $('#msg').parent().addClass('has-error');
  }
  else{
    if(F.charAt(2) == 'b') var name='a';
    else var name= 'b';
    $.post('php/user.php',{msg:'yes', F:F.charAt(2), T:name, message:message},function(data){
      $('.panel-body').append('<h6 style="height:20px;width:100%"class="text-right">'+message+'<h6>');
    });
  }
}
