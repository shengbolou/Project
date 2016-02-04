$(document).ready(function(){
   $('.navbar').velocity("transition.slideDownIn",{delay:3000});

   $('.myheader').velocity("transition.slideRightIn",{delay:3000});
  var width = innerWidth;
  var height = innerHeight;

  if(width > 768){
    $('#svg').velocity({
      translateY: "90px"
    },{delay:2900});
  }


  $(window).scroll(function(){
    if(width < 768){
      jQuery(".navbar").wrap('<div class="placeholder"></div>');
      jQuery(".placeholder").height(50);
      if($(this).scrollTop()>300){
        $('.navbar').addClass("navbar-fixed-top");
        $('.navbar').removeClass("before");
      }
      else{
        $('.navbar').removeClass("navbar-fixed-top");
        $('.navbar').addClass("before");
      }
    }
    if(width > 768 && width < 992){
      jQuery(".navbar").wrap('<div class="placeholder"></div>');
      jQuery(".placeholder").height(50);
      if($(this).scrollTop()>400){
        $('.navbar').addClass("navbar-fixed-top");
        $('.navbar').removeClass("before");
      }
      else{
        $('.navbar').removeClass("navbar-fixed-top");
        $('.navbar').addClass("before");
      }
    }
    if(width > 992 && width < 1550){
      jQuery(".navbar").wrap('<div class="placeholder"></div>');
      jQuery(".placeholder").height(50);
      if($(this).scrollTop()>550){
        $('.navbar').addClass("navbar-fixed-top");
        $('.navbar').removeClass("before");
      }
      else{
        $('.navbar').removeClass("navbar-fixed-top");
        $('.navbar').addClass("before");
      }
    }
    if(width > 1550){
      jQuery(".navbar").wrap('<div class="placeholder"></div>');
      jQuery(".placeholder").height(100);
      if($(this).scrollTop()>850){
        $('.navbar').addClass("navbar-fixed-top");
        $('.navbar').removeClass("before");
      }
      else{
        $('.navbar').removeClass("navbar-fixed-top");
        $('.navbar').addClass("before");
      }
    }
  });

$("#content-pic").velocity({ blur: 2 },{delay:3000},1200);
  // $.Velocity.hook($('#svg'),"transitionX","-100px");



});
