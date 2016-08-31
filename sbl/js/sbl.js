$(document).ready(function(){

  $.material.init();

  var myHeight = $( window ).height();
  var window_width = $(window).width();

  var nav_collapsed_check = 0;

  //configuration for lightbox plugin
  lightbox.option({
    'resizeDuration': 500,
    'wrapAround': true,
    'maxWidth': 1500
  });

  //check whether the page is fully loaded
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      $('.svg_block').append('<embed id="svg"  src="name.svg">');
      $('.load').velocity("transition.fadeOut",100);
    }
  }, 10);



  $('.side-nav').css("margin-top",myHeight/4);
  // $('.life').css('height',myHeight-50);
  var sequence = [
    {e:$('#Home-c a'),p:{translateX:0, opacity:1},o:{duration: 100,delay:200}},
    {e:$('#Resume-c a'),p:{translateX: 0,opacity:1},o:{duration: 100}},
    {e:$('#Contact-c a'),p:{translateX: 0,opacity:1},o:{duration: 100}}
  ];
  var sequence2 = [
    {e:$('#Home-c a'),p:{translateX:10, opacity:0},o:{duration: 100}},
    {e:$('#Resume-c a'),p:{translateX: 10,opacity:0},o:{duration: 100}},
    {e:$('#Contact-c a'),p:{translateX: 10,opacity:0},o:{duration: 100}}
  ];

  $('.bground').focus();
  $('.bground').mousemove(function( event ) {

    var containerWidth = $(this).innerWidth(),
    containerHeight = $(this).innerHeight(),
    mousePositionX = (event.pageX / containerWidth)*10,
    mousePositionY = (event.pageY /containerHeight)*104;

    $(this).css('background-position', mousePositionX + '%' + ' ' + mousePositionY + '%');

  });

  $('.nav-c li a').velocity({
    translateX: '10px',
    opacity: 0
  });
  $('.bground').velocity("fadeIn",{delay:200,duration:200});
  $('.pageheader').css('height',myHeight+30);
  $('.downward').css('top',myHeight-50);
  $('.downward').velocity('transition.slideUpIn',{delay:2000});
  $('.myheader').velocity('transition.slideUpIn',{delay:2000,duration:300});
  $('.nav-collapsed').css("height",myHeight);

  $(".navbar-toggle").on("click", function () {
    if(nav_collapsed_check == 0){
      $.Velocity.RunSequence(sequence);
      if(window_width > 450){
        $('.navbar-toggle').velocity({
          translateX: '-300px'
        },200);
      }
      $('.navbar-toggle .icon-bar:nth-of-type(1)').velocity({
        marginTop: '7px',
        rotateZ: '45deg'
      },200);
      $('.navbar-toggle .icon-bar:nth-of-type(3)').velocity({
        marginTop: '-7px',
        rotateZ: '-45deg'
      },200);
      $('.navbar-toggle .icon-bar:nth-of-type(2)').css("visibility","hidden");
      $('.nav-collapsed').velocity("transition.slideRightIn",200);
      nav_collapsed_check = 1;
    }
    else{
      $.Velocity.RunSequence(sequence2);
      $('.navbar-toggle').velocity({
        translateX: '0'
      },200);
      $('.navbar-toggle .icon-bar:nth-of-type(1)').velocity({
        marginTop: '0',
        rotateZ: '0'
      },200);
      $('.navbar-toggle .icon-bar:nth-of-type(3)').velocity({
        marginTop: '5px',
        rotateZ: '0'
      },200);
        $('.navbar-toggle .icon-bar:nth-of-type(2)').css("visibility","visible");
      $('.nav-collapsed').velocity("transition.slideRightOut",200);
      nav_collapsed_check = 0;
    }
  });



  var mine = $('.mine').position().top- myHeight + (myHeight/4);
  var time_line = $('.time-line').position().top- myHeight + (myHeight/4);
  var life = $('.life').position().top - myHeight + (myHeight/4);
  var work = $('.work').position().top - myHeight + (myHeight/4);

  $('.mine').velocity({
    translateY: '10px',
  },10);
  $('.life').velocity({
    translateY: '10px',
  },10);
  $('.time-line').velocity({
    translateY: '10px',
  },10);
  $('.work').velocity({
    translateY: '10px',
  },10);

  $(window).scroll(function(){


    if($(this).scrollTop() >= mine+400){
      if(!$('.side-nav').is(':visible')){
        $('.side-nav').stop().velocity("transition.fadeIn",{duration:200});
      }
    }
    if($(this).scrollTop() < mine+400){
      if($('.side-nav').is(':visible')){
        $('.side-nav').stop().velocity("transition.fadeOut",{duration:200});
      }
    }


    if($(this).scrollTop() >= mine){
      $('.side-nav li a').removeClass("active");
      $('.side-nav li:nth-child(1) a').addClass("active");
      $('.mine').velocity({
        translateY: 0,
        opacity: 1
      },300);
    }
    if($(this).scrollTop() >= time_line){
      $('.side-nav li a').removeClass("active");
      $('.side-nav li:nth-child(2) a').addClass("active");
      $('.time-line').velocity({
        translateY: 0,
        opacity: 1
      },300);
    }

    if($(this).scrollTop() >= life){
      $('.side-nav li a').removeClass("active");
      $('.side-nav li:nth-child(3) a').addClass("active");
      $('.life')
      .velocity({
        translateY: 0,
        opacity: 1
      },300);
    }
    if($(this).scrollTop() >= work){
      $('.side-nav li a').removeClass("active");
      $('.side-nav li:nth-child(4) a').addClass("active");
      $('.work')
      .velocity({
        translateY: 0,
        opacity: 1
      },300);
    }
  });


  $('.nav-c li a').hover(function(){
    $(this).stop().velocity({
      color:'#AAB2BD'
    },200)
  },function(){
    $(this).stop().velocity({
      color:'#F5F7FA'
    },200)
  });

  $('#navbar li a').hover(function(){
    $(this).stop(true,true).velocity({
      color:'#CCD1D9'
    },200)
  },function(){
    $(this).stop(true,true).velocity({
      color:'#AAB2BD'
    },200)
  });

  $('#brand').hover(function(){
    $(this).stop(true,true).velocity({
      color:'#CCD1D9'
    },100)
  },function(){
    $(this).stop(true,true).velocity({
      color:'#AAB2BD'
    },100)
  });


  $(window).scroll(function(){
    if($(this).scrollTop() >= $('body').height()-myHeight-30){
      if(!$('#info').is(':visible'))
        $('#info').velocity("fadeIn",{duration: 500});
    }
    if($(this).scrollTop() >= 150 && !$('.navbar').is(':visible')){
      $('.navbar').velocity('transition.slideDownIn',200);
    }
    if($(this).scrollTop() == 0){
      //scroll to top
      $('.navbar').velocity('transition.slideUpOut',200);
    }
  });


  $('.pdf').css('height',myHeight+30);

  $('#Resume').click(function(){
    $('#Home').removeClass("active");
    $(this).addClass("active")
  });

  $('#Close').click(function(){
    $('#Home').addClass("active");
    $('#Resume').removeClass("active")
  });

  $('#brand').click(function(){
      $('html').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });
  $('#logo').click(function(){
      $('html').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });

  $('.downward').velocity({
    translateY:'10px'
  },{loop:true}).velocity('reverse');

  $('.downward2').velocity({
    translateY:'10px'
  },{loop:true}).velocity('reverse');

  $('.downward3').velocity({
    translateY:'10px'
  },{loop:true}).velocity('reverse');
  $('.downward4').velocity({
    translateY:'10px'
  },{loop:true}).velocity('reverse');



  $('.downward').click(function(){
    $('html').velocity("scroll",{easing: [.53,.21,.29,.95],duration: 500, offset:mine+500}).stop();
  });
  $('.side-nav li:nth-child(1)').click(function(){
    $('html').velocity("scroll", { duration: 500, offset:mine+500}).stop();
  });

  $('.side-nav li:nth-child(2)').click(function(){
    $('html').velocity("scroll", { duration: 500,offset:time_line+500 }).stop();
  });
  $('.downward2').click(function(){
    $('html').velocity("scroll", { duration: 500,offset:time_line+500 }).stop();
  });

  $('.downward3').click(function(){
    $('html').velocity("scroll", { duration: 500,offset:work+500 }).stop();
  });
  $('.side-nav li:nth-child(4)').click(function(){
    $('html').velocity("scroll", { duration: 500,offset:work+500 }).stop();
  });

  $('.downward4').click(function(){
    $('html').velocity("scroll", { duration: 500,offset:life+500 }).stop();
  });
  $('.side-nav li:nth-child(3)').click(function(){
    $('html').velocity("scroll", { duration: 500,offset:life+500 }).stop();
  });
  $('#success').hide();
});


function Go(){
  var lastname = document.getElementById('lastname').value;
  var firstname = document.getElementById('firstname').value;
  var email = document.getElementById('email').value;
  var msg = document.getElementById('msg').value;

  if(lastname == '' || firstname == '' || msg == ''){
    $('.contact').velocity("callout.shake",300);

    if(lastname == ''){
      $('.lastname').addClass('has-error');
    }
    if(firstname == ''){
      $('.firstname').addClass('has-error');
    }
    if(msg == ''){
      $('.msg').addClass('has-error');
    }
  }
  else{
    $('.lastname').removeClass('has-error');
    $('.firstname').removeClass('has-error');
    $('.msg').removeClass('has-error');
    //AJAx
    $.post('sbl.php',{Go:'yes',lastname:lastname, firstname:firstname, email:email, msg:msg},function(data){
      if(data == 'success'){
        $('input').val("");
        $('textarea').val("");
        $('#success').show();
        $('.close').click(function(){
          $('#success').hide();
          $('.contact').modal("hide");
        })
      }
    });
  }
}
