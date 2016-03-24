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
    $.post('php/user.php',{get:'yes',name:data.substring(2)},function(data2){
      // alert(data2)
      if(data2.substring(2) !='none'){
        $('.panel-body').append(

        `<div class='container-fluid'>
            <div class='row'>
            <div style="margin-top:10px; position:relative;" class='col-md-1 pull-left'>
              <h4>from</h4>
            </div>
              <div style="margin-top:20px; position:relative; left:-4%;" class='col-md-2 msg-body pull-left'>
                <p style="margin-top:5px; margin-bottom:5px; font-family:Didact Gothic" align='justify'>
                  `+(data2.substring(2))+`
                </p>
              </div>
            </div>
          </div>`

        );

      }
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
      $('.panel-body').append(

        `<div class='container-fluid'>
          <div class='row'>
            <div style="margin-top:10px; margin-bottom:5px; position:relative; right:-4%;"class="col-md-1 pull-right">
              <h4>
              `+F.charAt(2)+`
              </h4>
            </div>
            <div style="margin-top:20px;position:relative; right:-4%;" class='col-md-2 msg-body pull-right'>
              <p style="margin-top:5px; margin-bottom:5px; font-family:Didact Gothic" align='justify'>
              `+message+`
              </p>
            </div>
          </div>
        </div>`

      );
    });
  }
}
