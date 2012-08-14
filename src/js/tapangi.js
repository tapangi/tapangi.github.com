window.Tapangi = {};
Tapangi.onResize = function () {
  var navbarHeight = parseInt($('.navbar .navbar-inner').css('height').substr(0, 3)),
      sectionHeight = window.innerHeight - navbarHeight;

  console.log(navbarHeight, sectionHeight);
  $(".container.body > div").css("height", sectionHeight);
  $('[data-spy="scroll"]').each(function () {
    $(this).scrollspy('refresh');
  });
}
$(document).ready(Tapangi.onResize);
$(window).resize(Tapangi.onResize);