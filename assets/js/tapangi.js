// Generated by CoffeeScript 1.3.3
var Tapangi, console, renderfeedcell_tweets;

console = window.console || {
  log: (function() {})
};

Tapangi = window.Tapangi = {};

Tapangi.emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

Tapangi.onReady = function() {
  Tapangi.onResize();
  Tapangi.initializeForm();
  Tapangi.initializeWhatDisc();
  Tapangi.initializeHowDisc();
  Tapangi.initializeBackToTop();
  return gettwitterfeed("tweets", "@polishprince");
};

Tapangi.onResize = function() {
  var homeSectionHeight, navbarHeight, sectionHeight;
  navbarHeight = window.innerWidth > 979 ? parseInt($('.navbar .navbar-inner').css('height').substr(0, 3), 10) : 0;
  sectionHeight = window.innerHeight - (navbarHeight + 25);
  homeSectionHeight = sectionHeight + 0;
  $(".container.body > .section").css("min-height", sectionHeight);
  $("#home-section").css("min-height", homeSectionHeight);
  return $('[data-spy="scroll"]').each(function() {
    return $(this).scrollspy('refresh');
  });
};

$(document).ready(Tapangi.onReady);

$(window).resize(Tapangi.onResize);

$("iframe").load(function(e) {
  $("#thanks").modal("show");
  return $("#contact-form")[0].reset();
});

$(".btn-navbar").bind('click', function() {
  $(this).toggleClass("active");
  return $(".nav-collapse li > a").bind("click", function() {
    return $(".btn-navbar").trigger('click');
  });
});

Tapangi.initializeBackToTop = function() {
  return $(".back-to-top").click(function(e) {
    return window.location.hash = "";
  });
};

/* --------------------------------------------
     Begin form.coffee
--------------------------------------------
*/


Tapangi.initializeForm = function() {
  var $contactForm, $fields;
  console.log("initialize form");
  $contactForm = $("#contact-form");
  $contactForm.find("[type=submit]").prop('disabled', true);
  $fields = $contactForm.find("input, textarea");
  $fields.bind("change", function(event) {
    return Tapangi.validateForm($contactForm);
  });
  $contactForm.bind('submit', function(e) {
    e.preventDefault();
    if (Tapangi.validateForm($contactForm)) {
      $contactForm[0].submit();
    }
    return false;
  });
  return false;
};

Tapangi.validateForm = function($contactForm) {
  var key, validationErrors, values;
  values = $contactForm.serializeObject();
  validationErrors = [];
  console.log(values);
  for (key in values) {
    if (key !== "comment" && key !== "Field7") {
      if (values[key] === "") {
        validationErrors.push(key);
      }
    }
    if (key === "Field2" && !Tapangi.emailRegex.test(values[key])) {
      validationErrors.push(key);
    }
  }
  if (validationErrors.length === 0) {
    $contactForm.find("[type=submit]").prop('disabled', false);
    return true;
  }
  return true;
};

Tapangi.afterSubmitComplete = function(data, status) {
  console.log(status);
  return console.log(data);
};

/* --------------------------------------------
     Begin twitter.coffee
--------------------------------------------
*/


renderfeedcell_tweets = function(data) {
  var author, html, img, text;
  text = data.text;
  author = data.from_user;
  img = data.profile_image_url;
  return html = '<div class="feedcell"><a target=_blank href="http://twitter.com/' + author + '"><img class="authorimg" src="' + img + '"></a><div class="feedtext">' + text + '</div></div>';
};

/* --------------------------------------------
     Begin disc.coffee
--------------------------------------------
*/


/* --------------------------------------------
     Begin shared.coffee
--------------------------------------------
*/


Tapangi.mouseX = function(e) {
  return e.offsetX || e.clientX - $(e.target).offset().left;
};

Tapangi.mouseY = function(e) {
  return e.offsetY || e.pageY - $(e.target).offset().top;
};

Tapangi.changeDisc = function($disc, section) {
  return $disc.removeClass(Tapangi[$disc.prop("id")].activeClasses).addClass(section + "-active");
};

Tapangi.mouseOutOnDisc = function(e) {
  return $(this).removeClass(Tapangi[$(this).prop("id")].hoverClasses + " down");
};

Tapangi.mouseDownOnDisc = function(e) {
  return $(this).addClass("down");
};

Tapangi.mouseMoveOnDisc = function(e) {
  var adjacent, angle, diffX, diffY, discId, maxRadius, minRadius, opposite, radius, tangent;
  discId = $(this).prop("id");
  diffX = Tapangi.mouseX(e) - Tapangi[discId].centerX;
  diffY = Tapangi.mouseY(e) - Tapangi[discId].centerY;
  opposite = Math.abs(diffY);
  adjacent = Math.abs(diffX);
  radius = Math.sqrt((opposite * opposite) + (adjacent * adjacent));
  minRadius = Tapangi[discId].minRadius;
  maxRadius = Tapangi[discId].maxRadius;
  if (radius > minRadius && radius <= maxRadius) {
    tangent = opposite / adjacent;
    if (diffX !== 0) {
      angle = Math.atan(tangent) * 180 / Math.PI;
      if (diffY < 0) {
        if (diffX < 0) {
          angle = 180 - angle;
        }
      } else {
        if (diffX < 0) {
          angle = angle + 180;
        } else {
          angle = 360 - angle;
        }
      }
    } else {
      if (diffY > 0) {
        angle = 270;
      } else {
        angle = 90;
      }
    }
  } else {
    angle = null;
  }
  return Tapangi[discId].reactToAngle(radius, angle, $(this));
};

Tapangi.onCarouselSlide = function(e) {
  var $current, discId, section;
  discId = $(this).data("disc") + "-disc";
  $current = $(e.target).find('.carousel-inner .active');
  if (e.relatedTarget) {
    section = $(e.relatedTarget).data("section");
  } else {
    if (e.direction === "left") {
      section = Tapangi[discId].first;
    } else {
      section = Tapangi[discId].last;
    }
  }
  return Tapangi.changeDisc($("#" + discId), section);
};

/* --------------------------------------------
     Begin what.coffee
--------------------------------------------
*/


Tapangi["what-disc"] = {};

Tapangi["what-disc"].minRadius = 22;

Tapangi["what-disc"].maxRadius = 110;

Tapangi["what-disc"].centerX = 0;

Tapangi["what-disc"].centerY = 0;

Tapangi["what-disc"].first = "social";

Tapangi["what-disc"].last = "cloud";

Tapangi["what-disc"].activeClasses = "social-active mobile-active cloud-active";

Tapangi["what-disc"].hoverClasses = "cloud-over social-over mobile-over";

Tapangi["what-disc"].reactToAngle = function(radius, angle, $disc) {
  if (angle) {
    if (angle < 60 || angle > 300) {
      if (!$disc.hasClass("cloud-over")) {
        return $disc.removeClass("social-over mobile-over").addClass("cloud-over");
      }
    } else if (angle > 60 && angle < 180) {
      if (!$disc.hasClass("social-over")) {
        return $disc.removeClass("cloud-over mobile-over").addClass("social-over");
      }
    } else {
      if (!$disc.hasClass("mobile-over")) {
        return $disc.removeClass("cloud-over social-over").addClass("mobile-over");
      }
    }
  } else {
    return $disc.removeClass("cloud-over social-over mobile-over");
  }
};

Tapangi.initializeWhatDisc = function() {
  var $whatDisc;
  $whatDisc = $("#what-disc");
  Tapangi["what-disc"].centerX = Math.floor($whatDisc.width() / 2) + 1;
  Tapangi["what-disc"].centerY = Math.floor($whatDisc.height() / 2) + 1;
  $whatDisc.mousemove(Tapangi.mouseMoveOnDisc);
  $whatDisc.mouseout(Tapangi.mouseOutOnDisc);
  $whatDisc.mousedown(Tapangi.mouseDownOnDisc);
  $whatDisc.mouseup(function(e) {
    var item;
    $(this).removeClass("down");
    if ($(this).hasClass("social-over")) {
      item = 0;
    } else if ($(this).hasClass("mobile-over")) {
      item = 1;
    } else {
      item = 2;
    }
    return $("#what-carousel").carousel(item);
  });
  Tapangi.changeDisc($("#what-disc"), "social");
  return $("#what-carousel").bind("slide", Tapangi.onCarouselSlide);
};

/* --------------------------------------------
     Begin how.coffee
--------------------------------------------
*/


Tapangi["how-disc"] = {};

Tapangi["how-disc"].minRadius = 53;

Tapangi["how-disc"].maxRadius = 108;

Tapangi["how-disc"].maxCenterRadius = 36;

Tapangi["how-disc"].centerX = 0;

Tapangi["how-disc"].centerY = 0;

Tapangi["how-disc"].first = "kick-off";

Tapangi["how-disc"].last = "communicate";

Tapangi["how-disc"].activeClasses = "kick-off-active analyze-active architect-active build-active launch-active scale-active communicate-active";

Tapangi["how-disc"].hoverClasses = "kick-off-over analyze-over architect-over build-over launch-over scale-over communicate-over";

Tapangi["how-disc"].reactToAngle = function(radius, angle, $disc) {
  console.log("reactToAngle", radius, angle);
  if (angle) {
    if (angle < 18 || angle > 306) {
      if (!$disc.hasClass("build-over")) {
        return $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("build-over");
      }
    } else if (angle > 18 && angle < 90) {
      if (!$disc.hasClass("architect-over")) {
        return $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("architect-over");
      }
    } else if (angle > 90 && angle < 162) {
      if (!$disc.hasClass("analyze-over")) {
        return $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("analyze-over");
      }
    } else if (162 > 90 && angle < 234) {
      if (!$disc.hasClass("scale-over")) {
        return $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("scale-over");
      }
    } else {
      if (!$disc.hasClass("launch-over")) {
        return $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("launch-over");
      }
    }
  } else {
    if (radius < Tapangi["how-disc"].maxCenterRadius) {
      if (!$disc.hasClass("communicate-over") && !$disc.hasClass("kick-off-active")) {
        return $disc.removeClass(Tapangi["how-disc"].hoverClasses).addClass("communicate-over");
      }
    } else {
      return $disc.removeClass(Tapangi["how-disc"].hoverClasses);
    }
  }
};

Tapangi.initializeHowDisc = function() {
  var $whatDisc;
  $whatDisc = $("#how-disc");
  Tapangi["how-disc"].centerX = Math.floor($whatDisc.width() / 2) + 1;
  Tapangi["how-disc"].centerY = Math.floor($whatDisc.height() / 2) + 1;
  $whatDisc.mousemove(Tapangi.mouseMoveOnDisc);
  $whatDisc.mouseout(Tapangi.mouseOutOnDisc);
  $whatDisc.mousedown(Tapangi.mouseDownOnDisc);
  $whatDisc.mouseup(function(e) {
    var item;
    $(this).removeClass("down");
    if ($(this).hasClass("analyze-over")) {
      item = 1;
    } else if ($(this).hasClass("architect-over")) {
      item = 2;
    } else if ($(this).hasClass("build-over")) {
      item = 3;
    } else if ($(this).hasClass("launch-over")) {
      item = 4;
    } else if ($(this).hasClass("scale-over")) {
      item = 5;
    } else if ($(this).hasClass("communicate-over")) {
      item = 6;
    }
    if (item) {
      return $("#how-carousel").carousel(item);
    }
  });
  Tapangi.changeDisc($("#how-disc"), "kick-off");
  return $("#how-carousel").bind("slide", Tapangi.onCarouselSlide);
};
