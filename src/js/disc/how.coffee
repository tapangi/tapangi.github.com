# how-disc config
Tapangi["how-disc"] = {}
# how-disc minRadius
Tapangi["how-disc"].minRadius = 53
# how-disc maxRadius
Tapangi["how-disc"].maxRadius = 108
Tapangi["how-disc"].maxCenterRadius = 36
# how-disc center placeholders
Tapangi["how-disc"].centerX = 0
Tapangi["how-disc"].centerY = 0
#first and last sections
Tapangi["how-disc"].first = "kick-off"
Tapangi["how-disc"].last = "communicate"
#all active classes
Tapangi["how-disc"].activeClasses = "kick-off-active analyze-active architect-active build-active launch-active scale-active communicate-active"
#all mouseOver classes
Tapangi["how-disc"].hoverClasses = "kick-off-over analyze-over architect-over build-over launch-over scale-over communicate-over"
# how-disc callback function to act on the mouse movement
Tapangi["how-disc"].reactToAngle = (radius, angle, $disc) ->
  console.log("reactToAngle",radius, angle)
  if angle
    ## decide:
    if angle < 18 || angle > 306
      if !$disc.hasClass("build-over")
        $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("build-over")
    else if angle > 18 && angle < 90
      if !$disc.hasClass("architect-over")
        $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("architect-over")
    else if angle > 90 && angle < 162
      if !$disc.hasClass("analyze-over")
        $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("analyze-over")
    else if 162 > 90 && angle < 234
      if !$disc.hasClass("scale-over")
        $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("scale-over")
    else
      if !$disc.hasClass("launch-over")
        $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("launch-over")
  else
    if radius < Tapangi["how-disc"].minRadius and radius > Tapangi["how-disc"].maxCenterRadius
      console.log("in the center")
    else
      $disc.removeClass(Tapangi["how-disc"].hoverClasses)



Tapangi.initializeHowDisc = () ->
  $whatDisc = $("#how-disc")
  Tapangi["how-disc"].centerX = Math.floor($whatDisc.width() / 2) + 1
  Tapangi["how-disc"].centerY = Math.floor($whatDisc.height() / 2) + 1

  #bind mouse move to the generic function
  $whatDisc.mousemove Tapangi.mouseMoveOnDisc
  # reset on mouse out
  # mouse out
  $whatDisc.mouseout Tapangi.mouseOutOnDisc

  $whatDisc.mousedown Tapangi.mouseDownOnDisc

  $whatDisc.mouseup (e)->
    $(this).removeClass("down")

    if $(this).hasClass("analyze-over")
      item = 1
    else if $(this).hasClass("architect-over")
      item = 2
    else if $(this).hasClass("build-over")
      item = 3
    else if $(this).hasClass("launch-over")
      item = 4
    else if $(this).hasClass("scale-over")
      item = 5
    else
      item = 6
    $("#how-carousel").carousel(item)

  Tapangi.changeDisc($("#how-disc"), "kick-off")

  $("#how-carousel").bind "slide", Tapangi.onCarouselSlide


