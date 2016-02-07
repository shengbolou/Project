$(document).ready(function(){
  var myHeight = $( window ).height();
  var check = 0;

  $('.pageheader').css('height',myHeight+30);
  $('.downward').css('top',myHeight-50);
  $('.downward').velocity('transition.slideUpIn',{delay:2500});
  $(".navbar-toggle").on("click", function () {
      $(this).toggleClass("active");
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

  $('.downward').click(function(){
    $('.mine').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });
  $('.downward2').click(function(){
    $('.life').velocity("scroll", { duration: 500, easing: "ease-in-out" });
  });
});
