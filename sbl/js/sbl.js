$(document).ready(function(){
  $(function()
  {
    $.material.init();
  });
  var myHeight = $( window ).height();

  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': false,
    'maxWidth': 1500,
    'maxHeight': 1000,
  });
  var window_width = $(window).width();
  var check = 0;
  var nav_collapsed_check = 0;

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


  $('.nav-c li a').velocity({
    translateX: '10px',
    opacity: 0
  });
  $('.bground').velocity("fadeIn",{delay:200,duration:200});
  $('.pageheader').css('height',myHeight+30);
  $('.downward').css('top',myHeight-50);
  $('.downward').velocity('transition.slideUpIn',{delay:2000});
    $('.myheader').velocity('transition.slideRightIn',{delay:1800});
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


  var mine = $('.mine').offset().top - myHeight;
  var life = $('.life').offset().top - myHeight;
  var work = $('.work').offset().top - myHeight;
  var a = 1;
  var b = 1;
  var c = 1;
    $('.mine').velocity({
      translateY: '10px',
    },10);
    $('.life').velocity({
      translateY: '10px',
    },10);
    $('.work').velocity({
      translateY: '10px',
    },10);

  $(window).scroll(function(){
    if($(this).scrollTop() >= mine && a==1){
      $('.mine').velocity({
        translateY: 0,
        opacity: 1
      },300);
      a=0;
    }
    if($(this).scrollTop() >= life && b==1){
      $('.life')
      .velocity({
        translateY: 0,
        opacity: 1
      },300);
      b=0;
    }
    if($(this).scrollTop() >= work && c==1){
      $('.work')
      .velocity({
        translateY: 0,
        opacity: 1
      },300);
      c=0;
    }
  });


  $('.nav-c li a').hover(function(){
    $(this).stop().velocity({
      color:'#bfd8df'
    },200)
  },function(){
    $(this).stop().velocity({
      color:'#ffffff'
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

  $('.hover').velocity({backgroundColor: '#5C5959' ,backgroundColorAlpha: 0.6});
  $('.hover3').velocity({backgroundColor: 'rgb(255, 255, 255)' ,backgroundColorAlpha: 0.6});
  $('.naptime').hover(
    function(){
      $(this).find('.hover').stop().velocity('transition.slideUpIn',200);
       $(this).stop(true,true).velocity({
         scale:'1.1'
       });
    },function(){
      $(this).find('.hover').stop().velocity('transition.slideDownOut',200);
      $(this).stop(true,true).velocity({
        scale:'1'
      });
  });



$('.hover2').css('transform','scale(0)');

$('.github').hover(
  function(){
    $(this).find('.hover2').stop().velocity({
      scale:'1',
    },"spring",600);
    $(this).stop().velocity({
      scale:'1.1',
    },"spring",600);
  },function(){
    $(this).find('.hover2').stop().velocity({
      scale:'0',
    },"spring",600);
    $(this).stop().velocity({
      scale:'1',
    },"spring",600);
  });
 $('.t3hr').css('width','0');
  $('.more').hover(
    function(){
      $(this).find('.hover3').stop().velocity('transition.slideLeftIn',200);
      $(this).find('.t3hr').stop().velocity({delay:100}).velocity({
        width:'300px'
      },200);
       $(this).stop().velocity({
         scale:'1.1'
       });
    },function(){
      $(this).find('.hover3').stop().velocity('transition.slideLeftOut',200);
      $(this).stop().velocity({
        scale:'1'
      });
      $(this).find('.t3hr').stop().velocity({delay:100}).velocity({
        width:'0px'
      },200);
  });

  $(window).scroll(function(){
    if($(this).scrollTop() >= $('body').height()-myHeight-30){
      if(!$('#info').is(':visible'))
        $('#info').velocity('transition.slideUpIn');
    }
    if($(this).scrollTop() >= 150 && check==0){
      $('.navbar').velocity('transition.slideDownIn',200);
       check=1;
    }
    if($(this).scrollTop() == 0){
      //scroll to top
      $('.navbar').velocity('transition.slideUpOut',200);
      check=0;
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
    $('.mine').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });
  $('.downward2').click(function(){
    $('.time-line').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });
  $('.downward4').click(function(){
    $('.life').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });
  $('.downward3').click(function(){
    $('.work').velocity("scroll", { duration: 500, easing: "ease-in-out" });
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
