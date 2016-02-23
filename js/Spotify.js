$(document).ready(function(){

    var myHeight = $(window).height();
    var check = 0;


    $('.navbar-toggle').click(function(){
      if(check == 0){
        $('.collapsed').velocity("transition.slideLeftIn",200);
        check = 1;
      }
      else if(check == 1){
          $('.collapsed').velocity("transition.slideLeftOut",200);
          check = 0;
        }
    });
    
    $('.collapsed-close').click(function(){
        $('.collapsed').velocity("transition.slideLeftOut",200);
    });




      $('.collapsed').css('height',myHeight);



})
