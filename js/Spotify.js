$(document).ready(function(){

    var myHeight = $(window).height();
    var check = 0;

    $('.page-header').css("height",myHeight);
    $('.ph').css("height",myHeight);

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

    $('#s_up').hover(function(){
      $(this).velocity({
        color:'#5bc721'
      })
    },function(){
      $(this).velocity({
        color:'#bdbdbd'
      })
    });
    
    $('#s_in').hover(function(){
      $(this).velocity({
        color:'#5bc721'
      })
    },function(){
      $(this).velocity({
        color:'#bdbdbd'
      })
    });

    $('#li a').hover(function(){
      $(this).velocity({
        color:'#5bc721'
      })
    },function(){
      $(this).velocity({
        color:'#ffffff'
      })
    });
    $('#ph_btn').hover(function(){
      $(this).velocity({
        backgroundColor:'#5bc721'
      },100)
    },function(){
      $(this).velocity({
        backgroundColor:'#37ac38'
      },100)
    });
    $('#ph_btn2').hover(function(){
      $(this).velocity({
        color:'#ffffff',
        backgroundColor:'#000000'
      },200)
    },function(){
      $(this).velocity({
        color:'#000000',
        backgroundColor:'#ffffff'
      },200)
    });



})
