$(document).ready(function(){
  $('.navbar').velocity("transition.slideDownIn",{delay:3000});
  var width = innerWidth;
  if(width > 992){
    $('#svg').velocity({
      translateY: "90px"
    },{delay:2900});
  }

$("#content-pic").velocity({ blur: 2 },{delay:3000},1200);
  // $.Velocity.hook($('#svg'),"transitionX","-100px");



});
