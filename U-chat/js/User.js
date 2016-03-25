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


//initialize time
var hour = -100;
var mins = -100;

function retrivemsg(){
  $.post('php/user.php',{UserName:'yes'},function(data){
    $.post('php/user.php',{get:'yes',name:data.substring(2)},function(data2){
      // alert(data2)
      if(data2.substring(2) !='none'){
        //show time
        var curr_time = new Date();
        var curr_hour = curr_time.getHours();
        var curr_mins = curr_time.getMinutes();
        if(curr_hour!=hour || curr_mins!=mins){
          hour = curr_hour;
          mins = curr_mins;
          if (curr_mins < 10) {
            curr_mins = '0'+curr_mins;
          }
          if (curr_hour < 10) {
            curr_hour = '0'+curr_hour;
          }
            $('.panel-body').append(
    `          <div class="text-center">
                <div style="
                margin-bottom:5px;
                background: #434A54;
                color: white;
                border-radius: 20px 20px 20px 20px;
                -moz-border-radius: 20px 20px 20px 20px;
                -webkit-border-radius: 20px 20px 20px 20px;
                border: 0px solid #000000;
                "class="label label-default time">`+curr_hour+':'+curr_mins+`</div>
              </div>`
            )
        }

        $('.panel-body').append(

        `<div class='container-fluid'>
            <div class='row'>

              <div style="

                position:relative;
                width:30px;
                height:30px;
                margin:20px 10px -10px 0px"class="col-md-2 user_img pull-left">

                <img style="position:relative; margin-left:-15px" src="./imgs/test.png" width="30px" height="30px"alt="" />
            </div>

              <div style="margin-top:20px;" class='col-md-2 msg-body pull-left'>
                <p style="margin-top:5px; margin-bottom:5px; font-family:Roboto" align='justify'>
                  `+(data2.substring(2))+`
                </p>
              </div>
            </div>
          </div>`

        );
        //animation scroll the message
        $('.panel-body').velocity('scroll',{duration:500,container: $('.panel-body')[0],offset:500});
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
    //show time
    var curr_time = new Date();
    var curr_hour = curr_time.getHours();
    var curr_mins = curr_time.getMinutes();
    if(curr_hour!=hour || curr_mins!=mins){
      hour = curr_hour;
      mins = curr_mins;
      if (curr_mins < 10) {
        curr_mins = '0'+curr_mins;
      }
      if (curr_hour < 10) {
        curr_hour = '0'+curr_hour;
      }
        $('.panel-body').append(
`          <div class="text-center">
            <div style="
            margin-bottom:5px;
            background: #434A54;
            color: white;
            border-radius: 20px 20px 20px 20px;
            -moz-border-radius: 20px 20px 20px 20px;
            -webkit-border-radius: 20px 20px 20px 20px;
            border: 0px solid #000000;
            "class="label label-default time">`+curr_hour+':'+curr_mins+`</div>
          </div>`
        )
    }

    if(F.charAt(2).toLowerCase() == 'b') var name='a';
    else var name= 'b';
    $.post('php/user.php',{msg:'yes', F:F.charAt(2), T:name, message:message.replace("'","''")},function(data){
      $('.panel-body').append(

        `<div class='container-fluid'>
          <div class='row'>

            <div style="margin-top:20px;" class='col-md-2 msg-body pull-right'>

              <p style="margin-top:5px; margin-bottom:5px; font-family:Roboto" align='justify'>
              `+message+`
              </p>

            </div>

          </div>
        </div>`

      );
      $('#msg').focus();
      //animation scroll the message
      $('.panel-body').velocity('scroll',{duration:500,container: $('.panel-body')[0],offset:500});
    });
  }


}
