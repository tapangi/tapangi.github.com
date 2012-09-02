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

console = window.console || {log:(->)}
Tapangi = window.Tapangi = {}
Tapangi.emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

Tapangi.onReady = () ->
  Tapangi.onResize()
  Tapangi.initializeForm()

Tapangi.onResize = () ->
  navbarHeight = parseInt $('.navbar .navbar-inner').css('height').substr(0, 3), 10
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
      $contactForm[0].submit();
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

$(document).ready(Tapangi.onReady)
$(window).resize(Tapangi.onResize)
$("iframe").load (e) ->
  $("#thanks").modal("show")
  $("#contact-form")[0].reset()

