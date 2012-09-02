Tapangi = window.Tapangi = {};
Tapangi.onReady = () ->
  Tapangi.onResize()
  Tapangi.initializeForm()

Tapangi.onResize =  () ->
  navbarHeight = parseInt $('.navbar .navbar-inner').css('height').substr(0,3) ,10
  sectionHeight = window.innerHeight - navbarHeight
  $(".container.body > div").css("height", sectionHeight)
  $('[data-spy="scroll"]').each( () ->
    $(this).scrollspy('refresh')
  )


Tapangi.initializeForm = () ->
  console.log "initialize form"
  $contactForm = $ "#contact-form"
  $contactForm.find("[type=submit]").prop('disabled', true)
  $contactForm.bind 'submit', (e) ->
    e.preventDefault()
    Tapangi.validateForm($contactForm)
    false
  false

Tapangi.validateForm = ($contactForm) ->



$(document).ready(Tapangi.onReady);
$(window).resize(Tapangi.onResize);