##
# this is used to serialize the form values to JSON
# @return {Object}
##
$.fn.serializeObject = () ->
  o = {}
  a = this.serializeArray()
  $.each a, () ->
    if (o[this.name] != undefined)
      o[this.name] = [o[this.name]] if !o[this.name].push
      o[this.name].push(this.value || '')
    else
      o[this.name] = this.value || ''
  return o

console = window.console || {log: (->)}
Tapangi = window.Tapangi = {}
Tapangi.emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

Tapangi.onReady = () ->
  Tapangi.onResize()
  Tapangi.initializeForm()
  Tapangi.initializeWhatDisc()

  gettwitterfeed("tweets", "@polishprince")

Tapangi.onResize = () ->
  navbarHeight = if window.innerWidth > 979 then parseInt $('.navbar .navbar-inner').css('height').substr(0, 3), 10 else 0
  sectionHeight = window.innerHeight - navbarHeight
  $(".container.body > div").css("min-height", sectionHeight)
  $('[data-spy="scroll"]').each(() ->
    $(this).scrollspy('refresh')
  )


Tapangi.initializeForm = () ->
  console.log "initialize form"
  $contactForm = $ "#contact-form"
  $contactForm.find("[type=submit]").prop('disabled', true)
  $fields = $contactForm.find("input, textarea")
  $fields.bind("change", (event) ->
    Tapangi.validateForm($contactForm)
  )
  $contactForm.bind 'submit', (e) ->
    e.preventDefault()
    if Tapangi.validateForm($contactForm)
      #values = $contactForm.serializeObject()
      #$.post($contactForm.prop('action'),values, Tapangi.afterSubmitComplete,"script")
      $contactForm[0].submit()
      ;
    false
  false

Tapangi.validateForm = ($contactForm) ->
  values = $contactForm.serializeObject()
  validationErrors = []
  console.log(values)
  for key of values
    if key != "comment" and key != "Field7"
      if values[key] == ""
        validationErrors.push key

    if key == "Field2" and !Tapangi.emailRegex.test values[key]
      validationErrors.push key


  if validationErrors.length == 0
    $contactForm.find("[type=submit]").prop('disabled', false)
    return true

  return true

Tapangi.afterSubmitComplete = (data, status) ->
  console.log(status)
  console.log(data)


renderfeedcell_tweets = (data) ->
  text=data.text
  author=data.from_user
  img=data.profile_image_url
  html='<div class="feedcell"><a target=_blank href="http://twitter.com/' + author + '"><img class="authorimg" src="' + img + '"></a><span class="feedtext">' + text + '</span></div>'


$(document).ready(Tapangi.onReady)
$(window).resize(Tapangi.onResize)
$("iframe").load (e) ->
  $("#thanks").modal("show")
  $("#contact-form")[0].reset()

$(".btn-navbar").bind 'click', () ->
  $(this).toggleClass("active")
  $(".nav-collapse li > a").bind "click", () ->
    $(".btn-navbar").trigger('click')





Tapangi.initializeWhatDisc = ()->
  discWidth = $("#what-disc").width()
  discHeight = $("#what-disc").height()
  Tapangi.whatDiscCenterX = Math.floor(discWidth / 2) + 1
  Tapangi.whatDiscCenterY = Math.floor(discHeight / 2) + 1


  $("#what-disc").mousemove (e)->

    mouseX = e.offsetX || e.clientX - $(e.target).offset().left
    mouseY = e.offsetY || e.pageY - $(e.target).offset().top


    diffX = (mouseX - Tapangi.whatDiscCenterX)
    diffY = (mouseY - Tapangi.whatDiscCenterY)

    opposite = Math.abs(diffY)
    adjacent = Math.abs(diffX)
    radius = Math.sqrt((opposite * opposite) + (adjacent * adjacent))

    minRadius = 22
    maxRadius = 110

    if radius > minRadius and radius <= maxRadius
      tangent = opposite / adjacent
      if diffX != 0
        angle = Math.atan(tangent) * 180 / Math.PI
        if diffY < 0
          if diffX < 0
            angle = 180 - angle
        else
          if diffX < 0
            angle = angle + 180
          else
            angle = 360 - angle
      else
        if diffY > 0
          angle = 270
        else
          angle = 90

      ## adjust based on the rotation of the star

      ## decide:
      if angle < 60 || angle > 300
        if !$(this).hasClass("cloud")
          $(this).removeClass("social mobile").addClass("cloud")
      else if angle > 60 && angle < 180
        if !$(this).hasClass("social")
          $(this).removeClass("cloud mobile").addClass("social")
      else
        if !$(this).hasClass("mobile")
          $(this).removeClass("cloud social").addClass("mobile")
    else
      $(this).removeClass("cloud social mobile")

  $("#what-disc").mouseout (e)->
    $(this).removeClass("cloud social mobile down")

  $("#what-disc").mousedown (e)->
    $(this).addClass("down")

  $("#what-disc").mouseup (e)->
    $(this).removeClass("down")



Tapangi.initializeHowDisc = ()->
  discWidth = $("#how-disc").width()
  discHeight = $("#how-disc").height()
  Tapangi.howDiscCenterX = Math.floor(discWidth / 2) + 1
  Tapangi.howDiscCenterY = Math.floor(discHeight / 2) + 1

