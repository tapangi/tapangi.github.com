##
# this is used to serialize the form values to JSON
# @return {Object}
##
#$.fn.serializeObject = () ->
#  o = {}
#  a = this.serializeArray()
#  $.each a, () ->
#    if (o[this.name] != undefined)
#      o[this.name] = [o[this.name]] if !o[this.name].push
#      o[this.name].push(this.value || '')
#    else
#      o[this.name] = this.value || ''
#  return o



console = window.console || {log: (->)}
Tapangi = window.Tapangi = {}
Tapangi.emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

#@codekit-append "form.coffee"
#@codekit-append "twitter.coffee"
#@codekit-append "disc.coffee"

Tapangi.onReady = () ->
  Tapangi.onResize()
  Tapangi.initializeForm()
  Tapangi.initializeWhatDisc()
  Tapangi.initializeHowDisc()
  Tapangi.initializeBackToTop()
  gettwitterfeed("tweets", "@polishprince")

Tapangi.onResize = () ->
  navbarHeight = if window.innerWidth > 979 then parseInt $('.navbar .navbar-inner').css('height').substr(0, 3), 10 else 0
  sectionHeight = window.innerHeight - ( navbarHeight + 25)
  homeSectionHeight = sectionHeight + 0
  #sectionHeight = 540 if sectionHeight > 540
  $(".container.body > .section").css("min-height", sectionHeight)
  $("#home-section").css("min-height", homeSectionHeight)
  $('[data-spy="scroll"]').each(() ->
    $(this).scrollspy('refresh')
  )







$(document).ready(Tapangi.onReady)
$(window).resize(Tapangi.onResize)
$("iframe").load (e) ->
  $("#thanks").modal("show")
  $("#contact-form")[0].reset()

$(".btn-navbar").bind 'click', () ->
  $(this).toggleClass("active")
  $(".nav-collapse li > a").bind "click", () ->
    $(".btn-navbar").trigger('click')


Tapangi.initializeBackToTop  = ()->
  $(".back-to-top").click (e)->
    window.location.hash = "";
