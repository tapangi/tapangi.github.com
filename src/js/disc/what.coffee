# what-disc config
Tapangi["what-disc"] = {}
# what-disc minRadius
Tapangi["what-disc"].minRadius = 22
# what-disc maxRadius
Tapangi["what-disc"].maxRadius = 110
# what-disc center placeholders
Tapangi["what-disc"].centerX = 0
Tapangi["what-disc"].centerY = 0
#first and last sections
Tapangi["what-disc"].first = "social"
Tapangi["what-disc"].last = "cloud"
#all active classes
Tapangi["what-disc"].activeClasses = "social-active mobile-active cloud-active"
#all mouseOver classes
Tapangi["what-disc"].hoverClasses = "cloud-over social-over mobile-over"
# what-disc callback function to act on the mouse movement
Tapangi["what-disc"].reactToAngle = (radius,angle,$disc) ->
  if angle
    ## decide:
    if angle < 60 || angle > 300
      if !$disc.hasClass("cloud-over")
        $disc.removeClass("social-over mobile-over").addClass("cloud-over")
    else if angle > 60 && angle < 180
      if !$disc.hasClass("social-over")
        $disc.removeClass("cloud-over mobile-over").addClass("social-over")
    else
      if !$disc.hasClass("mobile-over")
        $disc.removeClass("cloud-over social-over").addClass("mobile-over")
  else
    $disc.removeClass("cloud-over social-over mobile-over")



Tapangi.initializeWhatDisc = () ->
  $whatDisc = $("#what-disc")
  Tapangi["what-disc"].centerX = Math.floor($whatDisc.width() / 2) + 1
  Tapangi["what-disc"].centerY = Math.floor($whatDisc.height() / 2) + 1

  #bind mouse move to the generic function
  $whatDisc.mousemove Tapangi.mouseMoveOnDisc
  # reset on mouse out
  # mouse out
  $whatDisc.mouseout Tapangi.mouseOutOnDisc

  $whatDisc.mousedown Tapangi.mouseDownOnDisc

  $whatDisc.mouseup (e)->
    $(this).removeClass("down")
    if $(this).hasClass("social-over")
      item = 0
    else if $(this).hasClass("mobile-over")
      item = 1
    else
      item = 2
    $("#what-carousel").carousel(item)

  Tapangi.changeDisc($("#what-disc"), "social")

  $("#what-carousel").bind "slide", Tapangi.onCarouselSlide


