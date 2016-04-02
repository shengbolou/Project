//initialize time
var hour = -100;
var mins = -100;
var username;
var send_friend_reques_to  = "";
var send_msg_to = "";
var side_nav_shown = 0;
var myHeight;
$(document).ready(function(){
  $('body').velocity({
    opacity: 0
  },0);
  myHeight = $(window).height();
  $('.side_bar').css("height",myHeight);
  $('.chat_content').css("height",myHeight/2);
  $('.side_nav').velocity({
    translateX: '-400px'
  },0);

  $('#asd').popover();

  $(document).keypress(function(event){

    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == '13'){
        $('#submit').click();
    }

  });

  $('.chose_photo_success_alert').click(function(){
    $('.photo_success_alert').velocity('transition.slideUpOut',100);
  });
  $('.info_alert_btn').click(function(){
    $('.info_alert').velocity('transition.slideUpOut',300);
  });

  $('.logout_btn').click(function(){
      window.location = "php/logout.php";
  });

  //get user anme
  $.post('php/user.php',{UserName:'yes'},function(data){
    if (data.substring(2) == '') {
      window.location = "index.html"
    }
    else {
      $('body').velocity({
        opacity: 1
      });
    }
    username = data;
    // load_friends();
    check_msgs();
    load_user_photo();
    check_online();
    $('#header').append(username);
  });

  // retrivemsg();
  query_friend_request();

  // handle nav bar toggle
  $('.hamburger').click(function(){

    if(side_nav_shown == 0){

      $('.menu-top').velocity({
        rotateZ: '45deg',
        top: '10px'
      },300);
      $('.menu-middle').velocity({
        rotateX: '90deg'
      },100);
      $('.menu-bottom').velocity({
        rotateZ: '-45deg',
        top: '10px'
      },300);




      $('.side_nav').velocity({
        translateX: '0'
      },300);
      $('.rest').velocity({
        translateX: '360px'
      },300);
      side_nav_shown = 1
    }
    else{

      $('.menu-top').velocity({
        rotateZ: '0',
        top: '0'
      },300);
      $('.menu-middle').velocity({
        rotateX: '0',
        top: '12px'
      },100);
      $('.menu-bottom').velocity({
        rotateZ: '0',
        top: '24px'
      },300);

      $('.side_nav').velocity({
        translateX: '-400px'
      },300);
      $('.rest').velocity({
        translateX: '0'
      },300);
      side_nav_shown = 0;
    }

  });

  var $draggable = $('.draggable').draggabilly({
  })

  $('.portfolio').hover(function(){
    $(this).stop(true,true).velocity({
      boxShadowBlur: "10",
    },300)
  },function(){
    $(this).stop(true,true).velocity({
      boxShadowBlur: "0",
    },300)
  });
  $('.msg_block .msg_container').hover(function(){
    $(this).stop(true,true).velocity({
      boxShadowBlur: "10",
    },300)
  },function(){
    $(this).stop(true,true).velocity({
      boxShadowBlur: "0",
    },300)
  });

  $('.my_nav li a').hover(function(){
    $(this).stop(true,true).velocity({
      backgroundColor: "#F5F7FA"
    },300)
  },function(){
    $(this).stop(true,true).velocity({
      backgroundColor: '#E6E9ED'
    },300)
  });
  $('.list-group .list-group-item').hover(function(){
    $(this).stop(true,true).velocity({
      backgroundColor: "#E6E9ED"
    },300)
  },function(){
    $(this).stop(true,true).velocity({
      backgroundColor: '#F5F7FA'
    },300)
  });

});

//function to submit user info
function Submit_info(){
  var info = document.getElementById('info').value;
  if(info == '')
    $('#info').parent().addClass('has-error');
  else{
    $.post('php/user.php',{info:'yes', user:username.substring(2), info:info},function(data){
      $('.info_alert').velocity('transition.slideDownIn',300);
    });
  }
}


//close the chat box
function close_chat_box() {
  send_msg_to="";
  $('.chat-box').velocity('transition.slideLeftOut',200);
}
//closr setting box
function close_setting_box() {
  $('.settings').velocity('fadeOut',200);
}
//show settings
function show_settings(){
  $('.settings').velocity('fadeIn',200);
}

//set photo
function set_photo(data){
  $.post('php/user.php',{set_photo:'yes',user:username.substring(2),url:data},function(data){
    if (data.substring(2)=="success") {
      $('.photo_success_alert').velocity("fadeIn",300);
    }
  });
}

//load user photo
function load_user_photo(){
  $.post('php/user.php',{load_user_photo:'yes',user:username.substring(2)},function(data){
    if (data.substring(2)!='') {
      document.getElementById('user_photo').src=data.substring(2);
    }
  });
}



//send_friend_request
function send_friend_request(){
  $('.send_r').velocity("transition.slideUpOut",300);

  if (username.substring(2) != send_friend_reques_to) {
    $.post('php/user.php',{send:'yes',F:username.substring(2),T:send_friend_reques_to},function(data){
      switch (data.substring(2)) {
        case 'success':
        $('.send_s').velocity('transition.slideUpIn',1200).velocity('transition.slideUpOut');
        break;
        case 'already friends':
        $('.send_w').velocity('transition.slideUpIn',1200).velocity('transition.slideUpOut');
        break;
      }
    });
  }

}

// search friends
function search(name){
  $('.friends').empty();
  $('.send_r').velocity("transition.slideUpOut",300);
  if(name.length != 0){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $('.friends').append(xmlhttp.responseText);
      }
    };
    xmlhttp.open("GET", "php/user.php?q=" + name, true);
    xmlhttp.send();
  }
  else{
    $('.friends').empty();
  }
}

// send friend request
function friend(name){
  send_friend_reques_to = name;
  document.getElementById('content').innerHTML = "Send friend request to "+name+" ?";
  $('.send_r').velocity("transition.slideUpIn",300);
}

// check if there is friend request
function query_friend_request(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if (xmlhttp.responseText.substring(2) != '') {
        document.getElementById('request_num').innerHTML = xmlhttp.responseText;
      }
    }
  };
  xmlhttp.open('GET','php/user.php?request='+username,true);
  xmlhttp.send();
  setTimeout(query_friend_request,1000);
}


// load friend request tab
function load_friend_request(){
  $('.side_bar').empty();
  $('#first_tab').removeClass('active');
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var requests = xmlhttp.responseText.substring(2).split(",");

      //if there is no request
      if (requests.length-1 == 0) {
        document.getElementById('request_num').innerHTML = '';
        $('.side_bar').append(

          `<div style="position:relative; width:100%; left:0; margin-bottom:20px; border-radius:0px 0px 0px 0px"class="alert alert-info friend_alert">
          <p style="margin-bottom:20px">
            <strong>No request</strong>
          </p>
          </div>`

        )
      }
      for(i = 0; i<requests.length-1;i++){
        var tmp = requests[i];
        $('.side_bar').append(

          `<div style="position:relative; width:100%; left:0; margin-bottom:20px;border-radius:0px 0px 0px 0px"class="alert alert-info friend_alert">
          <p style="margin-bottom:20px">
          Friend request from <strong>`+tmp+`</strong>
          </p>
          <button id="`+tmp+`" class="btn btn-success"type="button" onclick="accept(this.id)" name="button">Accept</button>
          <button id="`+tmp+`" class="btn btn-danger"type="button" onclick="cancel(this.id)" name="button">cancel</button>
          </div>`

        )
      }
    }
  };

  xmlhttp.open('GET','php/user.php?load='+username,true);
  xmlhttp.send();
}

// cancel friend request
function cancel(data){
  $('#'+data).parent().velocity('transition.slideUpOut',200);
  $.post('php/user.php',{cancel:'yes',F:data},function(data){
  });
}

//accept friend request
function accept(data){
  $('#'+data).parent().velocity('transition.slideUpOut',200);
  $.post('php/user.php',{accept:'yes',Friend:data,This:username.substring(2)},function(data){
  });
}

//load friends
function load_friends(){
  $('.side_bar').empty();
  $('.xx').empty();
  $('.side_bar').append(`<div class="list-group xx"> </div>`)
  $.post('php/user.php',{load_friends:'yes',user:username.substring(2)},function(data){
    var friends = data.substring(2).split(",");
    document.getElementById('friends_num').innerHTML = (friends.length-1).toString();

    if (friends.length-1==0) {
      $('.xx').append(
        `<li style="border-radius:0px 0px 0px 0px"href="#" class="list-group-item"><strong>No friends</strong></li>`
      )
    }
    for(i=0; i<friends.length-1;i++){
      $('.xx').append(
         `<a style="border-radius:0px 0px 0px 0px"href="#" id="`+friends[i]+`" onclick="startChat(this.id)" class="list-group-item">`+friends[i]+`
            <span class="glyphicon glyphicon-record pull-right" aria-hidden="true"></span>
         </a>`
      )
    }
 });
}

//check friends online states
function check_online(){
  var http = new XMLHttpRequest();
  http.onreadystatechange = function(){
    if (http.readyState == 4 && http.status == 200) {
      var friends = http.responseText.substring(2).split(",");
      for(i=0; i<friends.length-1;i=i+2){
        if (friends[i+1] == '1') {
          $('#'+friends[i]+' span').velocity({color:'#42ad28'},200);
        }
        else {
          $('#'+friends[i]+' span').velocity({color:'#434A54'},200);
        }
      }
    }
  };
  http.open('GET','php/user.php?check_online='+username.substring(2),true);
  http.send();
  setTimeout(check_online,500);
}

//check msgs
function check_msgs(){
  var http = new XMLHttpRequest();
  // $('.msg_container').empty();
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      var msg_array = http.responseText.substring(2).split(",");
      for(i = 0 ; i<msg_array.length-1; i++){
        // $('#'+msg_array[i]+' span').velocity('fadeIn',100).velocity('reverse');
        if ($('.msg_block').find('#'+msg_array[i]).length < 1) {

          $('.msg_block').append(
            `
            <div id="`+msg_array[i]+`" onclick="startChat(this.id)" class="msg_container">

            <a href="#">
            <div style="overflow:hidden" class="cover text-center">
            <h6 class="cover_name"style="color:white; font-size:25px;">
            `+msg_array[i]+`
            </h6>
            </div>
            <img src="imgs/user.png" width="60px" height="60px" alt=""/>
            </a>

            </div>
            `

          );
        }
        $('.msg_block').find('#'+msg_array[i]).velocity('callout.bounce');
      }
    }
  };
  http.open('GET','php/user.php?check_msg='+username.substring(2),true);
  http.send();
  setTimeout(check_msgs,1000);
}

//start chat function
function startChat(data){
  retrivemsg();
  load_history(data);
  document.getElementById('chat_header').innerHTML = data;
  send_msg_to = data;
  $('.chat-box').velocity('transition.slideLeftIn',300);
  $('.chat_content').empty();
}

function load_history(data) {
  $.post('php/user.php',{load_history:'yes',F:username.substring(2),T:data},function(data){
    if (data.substring(2)!= 'no history') {
      $('.chat_content').append(data);
      $('.chat_content').scrollTop($('.chat_content')[0].scrollHeight);
    }
  });
}


//load search bar
function search_friends(){
  $('.side_bar').empty();
  $('.side_bar').append(
`    <div class="row">
      <div class="col-md-12">

        <div class="search">
          <input type="text"
          style="border-radius:0px 0px 0px 0px; height:50px;"
          class="form-control"
          onkeyup="search(this.value)"
          placeholder="Search for more friends..">

          <div class="alert alert-info send_r">
            <p id="content">
            </p>
            <button class="btn btn-primary" onclick="send_friend_request()"type="button" name="button">send</button>
          </div>

          <div class="alert alert-success send_s">
            <p>
              success!
            </p>
          </div>

          <div class="alert alert-warning send_w">
            <p>
              Already friends!
            </p>
          </div>

          <ul class="list-group friends">
          </ul>
        </div>

      </div>
    </div>`
  )
}

// get message
function retrivemsg(){

  var curr_time = new Date();
  var curr_hourx = curr_time.getHours();
  var curr_minsx = curr_time.getMinutes();
  var time;
  if(curr_hourx!=hour || curr_minsx!=mins){
    if (curr_minsx < 10) {
      curr_minsx = '0'+curr_minsx;
    }
    if (curr_hourx < 10) {
      curr_hourx = '0'+curr_hourx;
    }
    time = curr_hourx+':'+curr_minsx;
  }
  else {
    time = '';
  }

  $.post('php/user.php',{UserName:'yes'},function(data){
    $.post('php/user.php',{get:'yes',name:username.substring(2),from:send_msg_to,time:time},function(data2){
      // alert(data2)
      if(data2.substring(2) !='none'){
        //show time
        var photo_url = data2.split("^&^")[1];
        data2 = data2.split("^&^")[0];

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
            $('.chat_content').append(
    `          <div class="text-center">
                <div style="
                margin-bottom:5px;
                background: #434A54;
                color: white;
                border-radius: 20px 20px 20px 20px;
                -moz-border-radius: 20px 20px 20px 20px;
                -webkit-border-radius: 20px 20px 20px 20px;
                border: 0px solid #000000;
                opacity:0.6
                "class="label label-default time">`+curr_hour+':'+curr_mins+`</div>
              </div>`
            )
        }

        $('.chat_content').append(

        `<div class='container-fluid'>
            <div class='row'>

              <div style="
                position:relative;
                width:30px;
                height:30px;
                margin:20px 10px -10px 0px"

                class="col-md-2 friend_photo pull-left">

                <img style="position:relative; margin-left:-15px" src="`+photo_url+`" width="30px" height="30px"alt="" />
            </div>

              <div style="margin-top:20px;" class='col-md-2 msg-body pull-left'>
                <p style="margin-top:5px; margin-bottom:5px; font-family:Roboto">
                  `+(data2.substring(2))+`
                </p>
              </div>
            </div>
          </div>`

        );
        //animation scroll the message
        $('.chat_content').velocity('scroll',{duration:500,container: $('.chat_content')[0],offset:500});
      }
    });
  });
  setTimeout(retrivemsg, 1000);
}

function Submit(){
  var message  = document.getElementById("msg").value;
  var time;
  // var F = document.getElementById("header").innerHTML.toLowerCase();
  $('#msg').val('');
  if(message == ''){
    $('#msg').parent().addClass('has-error');
  }
  else{
    $('#msg').parent().removeClass('has-error');
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
        $('.chat_content').append(
`          <div class="text-center">
            <div style="
            margin-bottom:5px;
            background: #434A54;
            color: white;
            border-radius: 20px 20px 20px 20px;
            -moz-border-radius: 20px 20px 20px 20px;
            -webkit-border-radius: 20px 20px 20px 20px;
            border: 0px solid #000000;
            opacity:0.6
            "class="label label-default time">`+curr_hour+':'+curr_mins+`</div>
          </div>`
        )
        time = curr_hour+':'+curr_mins;
    }
    else {
      time = '';
    }

    $.post('php/user.php',{msg:'yes', F:username.substring(2), T:send_msg_to, message:message.replace("'","''"),time:time},function(data){
      $('.chat_content').append(

        `<div class='container-fluid'>
          <div class='row'>

            <div style="margin-top:20px;" class='col-md-2 msg-body pull-right'>

              <p style="margin-top:5px; margin-bottom:5px; font-family:Roboto">
              `+message+`
              </p>

            </div>

          </div>
        </div>`

      );
      $('#msg').focus();
      //animation scroll the message
      $('.chat_content').velocity('scroll',{duration:500,container: $('.chat_content')[0],offset:500});
    });
  }


}
