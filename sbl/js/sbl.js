$(document).ready(function(){
  var myHeight = $( window ).height();
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
  $('.bground').velocity("fadeIn",{delay:350,duration:300});
  $('.pageheader').css('height',myHeight+30);
  $('.downward').css('top',myHeight-50);
  $('.downward').velocity('transition.slideUpIn',{delay:2500});
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
      $('.navbar-toggle .icon-bar:nth-of-type(2)').velocity({
        backgroundColorAlpha: '0'
      },0);
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
      $('.navbar-toggle .icon-bar:nth-of-type(2)').velocity({
        backgroundColorAlpha: '1'
      },0);
      $('.nav-collapsed').velocity("transition.slideRightOut",200);
      nav_collapsed_check = 0;
    }
  });


  $('.nav-c li a').hover(function(){
    $(this).velocity({
      color:'#bfd8df'
    },100)
  },function(){
    $(this).velocity({
      color:'#ffffff'
    },100)
  });

  $('#navbar a').hover(function(){
    $(this).velocity({
      color:'#fbfbfb'
    },100)
  },function(){
    $(this).velocity({
      color:'#a3a3a3'
    },100)
  });

  $('#brand').hover(function(){
    $(this).velocity({
      color:'#fbfbfb'
    },100)
  },function(){
    $(this).velocity({
      color:'#a3a3a3'
    },100)
  });

  $('.hover').velocity({backgroundColor: '#5C5959' ,backgroundColorAlpha: 0.6});
  $('.hover3').velocity({backgroundColor: 'rgb(255, 255, 255)' ,backgroundColorAlpha: 0.6});
  $('.naptime').hover(
    function(){
      $(this).find('.hover').velocity('transition.slideUpIn',500);
       $(this).velocity({
         scale:'1.1'
       });
    },function(){
      $(this).find('.hover').velocity('transition.slideDownOut',500);
      $(this).velocity({
        scale:'1'
      });
  });



$('.hover2').css('transform','scale(0)');
  $('.github').hover(
    function(){
      $(this).find('.hover2').velocity({
        scale:'1.1',
      },"spring",1000);
       $(this).velocity({
         scale:'1.1',
         boxShadowBlur: 20
       },"spring",500);
    },function(){
      $(this).find('.hover2').velocity({
        scale:'0',
      },"spring",1000);
       $(this).velocity({
         scale:'1',
         boxShadowBlur: 0
       },"spring",500);
  });

 $('.t3hr').css('width','0');
  $('.more').hover(
    function(){
      $(this).find('.hover3').velocity('transition.slideLeftIn',500);
      $(this).find('.t3hr').velocity({delay:1000}).velocity({
        width:'300px'
      });
       $(this).velocity({
         scale:'1.1'
       });
    },function(){
      $(this).find('.hover3').velocity('transition.slideLeftOut',500);
      $(this).velocity({
        scale:'1'
      });
      $(this).find('.t3hr').velocity({delay:1000}).velocity({
        width:'0px'
      });
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

  $('.myheader').velocity('transition.slideRightIn',{delay:2500});

  $('.downward').velocity({
    translateY:'10px'
  },{loop:true}).velocity('reverse');

  $('.downward2').velocity({
    translateY:'10px'
  },{loop:true}).velocity('reverse');

  $('.downward3').velocity({
    translateY:'10px'
  },{loop:true}).velocity('reverse');

  $('.downward').click(function(){
    $('.mine').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });
  $('.downward2').click(function(){
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
    $('.contact').velocity("callout.shake");

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
