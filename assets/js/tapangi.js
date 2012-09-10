// Generated by CoffeeScript 1.3.3
var Tapangi, console, renderfeedcell_tweets;

$.fn.serializeObject = function() {
  var a, o;
  o = {};
  a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== void 0) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      return o[this.name].push(this.value || '');
    } else {
      return o[this.name] = this.value || '';
    }
  });
  return o;
};

console = window.console || {
  log: (function() {})
};

Tapangi = window.Tapangi = {};

Tapangi.emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

Tapangi.onReady = function() {
  Tapangi.onResize();
  Tapangi.initializeForm();
  Tapangi.initializeWhatDisc();
  return gettwitterfeed("tweets", "@polishprince");
};

Tapangi.onResize = function() {
  var navbarHeight, sectionHeight;
  navbarHeight = window.innerWidth > 979 ? parseInt($('.navbar .navbar-inner').css('height').substr(0, 3), 10) : 0;
  sectionHeight = window.innerHeight - navbarHeight;
  $(".container.body > div").css("min-height", sectionHeight);
  return $('[data-spy="scroll"]').each(function() {
    return $(this).scrollspy('refresh');
  });
};

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

renderfeedcell_tweets = function(data) {
  var author, html, img, text;
  text = data.text;
  author = data.from_user;
  img = data.profile_image_url;
  return html = '<div class="feedcell"><a target=_blank href="http://twitter.com/' + author + '"><img class="authorimg" src="' + img + '"></a><span class="feedtext">' + text + '</span></div>';
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

Tapangi.initializeWhatDisc = function() {
  var discHeight, discWidth;
  discWidth = $("#what-disc").width();
  discHeight = $("#what-disc").height();
  Tapangi.whatDiscCenterX = Math.floor(discWidth / 2) + 1;
  Tapangi.whatDiscCenterY = Math.floor(discHeight / 2) + 1;
  $("#what-disc").mousemove(function(e) {
    var adjacent, angle, diffX, diffY, maxRadius, minRadius, mouseX, mouseY, opposite, radius, tangent;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    diffX = mouseX - Tapangi.whatDiscCenterX;
    diffY = mouseY - Tapangi.whatDiscCenterY;
    opposite = Math.abs(diffY);
    adjacent = Math.abs(diffX);
    radius = Math.sqrt((opposite * opposite) + (adjacent * adjacent));
    minRadius = 22;
    maxRadius = 110;
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
      if (angle < 60 || angle > 300) {
        if (!$(this).hasClass("cloud")) {
          return $(this).removeClass("social mobile").addClass("cloud");
        }
      } else if (angle > 60 && angle < 180) {
        if (!$(this).hasClass("social")) {
          return $(this).removeClass("cloud mobile").addClass("social");
        }
      } else {
        if (!$(this).hasClass("mobile")) {
          return $(this).removeClass("cloud social").addClass("mobile");
        }
      }
    } else {
      return $(this).removeClass("cloud social mobile");
    }
  });
  $("#what-disc").mouseout(function(e) {
    return $(this).removeClass("cloud social mobile down");
  });
  $("#what-disc").mousedown(function(e) {
    return $(this).addClass("down");
  });
  return $("#what-disc").mouseup(function(e) {
    return $(this).removeClass("down");
  });
};

Tapangi.initializeHowDisc = function() {
  var discHeight, discWidth;
  discWidth = $("#how-disc").width();
  discHeight = $("#how-disc").height();
  Tapangi.howDiscCenterX = Math.floor(discWidth / 2) + 1;
  return Tapangi.howDiscCenterY = Math.floor(discHeight / 2) + 1;
};
