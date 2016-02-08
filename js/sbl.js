$(document).ready(function(){
  var myHeight = $( window ).height();
  var check = 0;

  $('.pageheader').css('height',myHeight+30);
  $('.downward').css('top',myHeight-50);
  $('.downward').velocity('transition.slideUpIn',{delay:2500});
  $(".navbar-toggle").on("click", function () {
      $(this).toggleClass("active");
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

 $('.ani').css('width','0');
  $('.more').hover(
    function(){
      $(this).find('.hover3').velocity('transition.slideLeftIn',500);
      $(this).find('.ani').velocity({delay:1000}).velocity({
        width:'400px'
      });
       $(this).velocity({
         scale:'1.1'
       });
    },function(){
      $(this).find('.hover3').velocity('transition.slideLeftOut',500);
      $(this).velocity({
        scale:'1'
      });
      $(this).find('.ani').velocity({delay:1000}).velocity({
        width:'0px'
      });
  });

  $(window).scroll(function(){
    if($(this).scrollTop() >= 150 && check==0){
      $('.navbar').velocity('transition.slideDownIn',200);
       check=1;
    }
    else if($(this).scrollTop() == 0){
      //scroll to top
      $('.navbar').velocity('transition.slideUpOut',200);
      check=0;
    }
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
});
