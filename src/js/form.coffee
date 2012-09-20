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
    $contactForm.find("[type=submit]").prop('disabled', false)
    return true

  return true

Tapangi.afterSubmitComplete = (data, status) ->
  console.log(status)
  console.log(data)