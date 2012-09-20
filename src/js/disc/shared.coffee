Tapangi.mouseX = (e) ->
  e.offsetX || e.clientX - $(e.target).offset().left

Tapangi.mouseY = (e) ->
  e.offsetY || e.pageY - $(e.target).offset().top

Tapangi.changeDisc = ($disc, section) ->
  $disc.removeClass(Tapangi[$disc.prop("id")].activeClasses).addClass(section + "-active")

Tapangi.mouseOutOnDisc = (e) ->
  $(this).removeClass(Tapangi[$(this).prop("id")].hoverClasses + " down")

Tapangi.mouseDownOnDisc = (e)->
  $(this).addClass("down")

Tapangi.mouseMoveOnDisc = (e) ->
  discId  = $(this).prop("id")

  diffX = (Tapangi.mouseX(e) - Tapangi[discId].centerX)
  diffY = (Tapangi.mouseY(e) - Tapangi[discId].centerY)

  opposite = Math.abs(diffY)
  adjacent = Math.abs(diffX)
  radius = Math.sqrt((opposite * opposite) + (adjacent * adjacent))

  minRadius = Tapangi[discId].minRadius
  maxRadius = Tapangi[discId].maxRadius

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
  else
    angle = null

  Tapangi[discId].reactToAngle(radius, angle, $(this))

Tapangi.onCarouselSlide = (e)->
  discId = $(this).data("disc") + "-disc"
  $current = $(e.target).find('.carousel-inner .active')
  if e.relatedTarget
    section = $(e.relatedTarget).data("section")
  else
    if e.direction == "left"
      section = Tapangi[discId].first
    else
      section = Tapangi[discId].last

  Tapangi.changeDisc($("#" + discId), section)