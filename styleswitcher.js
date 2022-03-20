function scroller(id) {
	document.getElementById(id).scrollIntoView();
}

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      if (typeof this.activeLink == 'undefined' || !this.activeLink) {
        this.activeLink = setActiveNavLink(window.location.pathname);
      }
      /* Exit the function: */
      return;
    }
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}

function trackScroll() {
  if (typeof this.topBtn == 'undefined') {
    this.topBtn = document.querySelector('.scroll-to-top');
    this.topBtn.addEventListener('click', backToTop);
  }
  if (this.topBtn != null) {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      this.topBtn.classList.add('scroll-to-top-show');
    } else {
      this.topBtn.classList.remove('scroll-to-top-show');
    }
  }
}

function setActiveNavLink(url) {
  var linkContainer = document.querySelectorAll('.navbar-link');
  let i = linkContainer.length;
  if (i == 0) return false;
  while (--i > 0) {
    var h = linkContainer[i].getAttribute("href");
    if (h == null || !h.match(".html")) continue;
    if (url.match(h.split(".")[0])) break;
  }
  linkContainer[i].firstChild.classList.add('active');
  return true;
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.src = url;
  script.async = true;
  if (callback && typeof callback == "function") {
    if (script.readyState) { // IE
      script.onreadystatechange = function() {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else { // Others
      script.onload = callback;
    }
  }
  document.head.appendChild(script);
}

loadScript("https://www.googletagmanager.com/gtag/js?id=UA-10249025-10");
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-10249025-10');

function refreshTag(id, refresh_time, interval, callback) {
  var timeout;
  var tag = document.getElementById(id);
  if (tag == null) {
    timeout = 500;
  } else {
    timeout = interval * 1000;
    callback(tag);
  }
  if (--refresh_time > 0) {
    setTimeout(function() {
      refreshTag(id, refresh_time, interval, callback);
    }, timeout);
  }
}

function showRunative(id) {
  loadScript("https://cdn.runative-syndicate.com/sdk/v1/n.js", function() {
    refreshTag(id, 5, 35, function(unused) {
      NativeAd({
        element_id: id,
        spot: "72719163e1c349e3afd19fa5260783ff",
        type: "label-under",
        cols: 4,
        rows: 1,
        title: "",
        titlePosition: "left",
        adsByPosition: "right",
        breakpoints: [{
          "cols": 2,
          "width": 770
        }],
        styles: {
          "headlineLink": {
            "color": "#333",
            ":hover": {
              "color": "#2e81d5"
            },
            "font-size": "14px",
            "font-weight": "bold"
          },
          "brandnameLink": {
            "font-size": "10px"
          }
        }
      });
    });
  });
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
  window.addEventListener('scroll', trackScroll);
  if (window.location.pathname != "" && window.location.pathname != "/" && window.location.pathname != "/index.html")
    loadScript("https://powerad.ai/script.js");
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
