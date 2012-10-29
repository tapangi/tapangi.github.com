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

Tapangi.initializeForm = () ->
  $contactForm = $ "#contact-form"
  $fields = $contactForm.find("input, textarea")
  $fields.bind("change", (event) ->
    Tapangi.validateForm($contactForm)
  )
  Tapangi.validateForm($contactForm)
  $contactForm.bind 'submit', (e) ->
    e.preventDefault()
    if Tapangi.validateForm($contactForm)
      $("iframe").load (e) ->
        $("#thanks").modal("show")
        $contactForm[0].reset()
        $(this).unbind("load")
        Tapangi.validateForm($contactForm)
      $contactForm[0].submit()
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
    console.log("validetion " + validationErrors.length)
    $contactForm.find("[type=submit]").prop('disabled', false).val("Submit")
    return true
  else
    $contactForm.find("[type=submit]").prop('disabled', true).val("Please fill out the form")
    return false

Tapangi.afterSubmitComplete = (data, status) ->
  console.log(status)
  console.log(data)