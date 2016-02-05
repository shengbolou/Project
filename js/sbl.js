$(document).ready(function(){
  var myHeight = $( window ).height();;

  $('.pageheader').css('height',myHeight+30);
  $(".navbar-toggle").on("click", function () {
      $(this).toggleClass("active");
  });
});
