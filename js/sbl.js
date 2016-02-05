$(document).ready(function(){
  var myHeight = $( window ).height();
  var check = 0;

  $('.pageheader').css('height',myHeight+30);
  $(".navbar-toggle").on("click", function () {
      $(this).toggleClass("active");
  });


  $(window).scroll(function(){
    if($(this).scrollTop() >= 150 && check==0){
      $('.navbar').velocity('transition.slideDownIn',200);
       check=1;
    }
    else if($(this).scrollTop() == 0){
      $('.navbar').velocity('transition.slideUpOut',200);
      check=0;
    }
  });

  $('.myheader').velocity('transition.slideRightIn',{delay:2500});
});
