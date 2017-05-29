// Select the page that should be shown.
function show(anchor) {
  var page = anchor.id;
  anchor.style.color = '#b52719';
  for (var i = 1; i < 10; ++i) {
    if ('page' + i == page) continue;
    try {
      document.getElementById('page' + i).style.color = 'white';
      Array.prototype.filter.call(
        document.getElementsByClassName('page' + i),
        function(element) {
          element.style.display = 'none';
        });
    } catch (e) {
    }
  }
  Array.prototype.filter.call(
    document.getElementsByClassName(page),
    function(element) {
      element.style.display = 'block';
    });
  return false;
}

// Automatically increase the number of years without requiring
// edits to the HTML file.
function years(since) {
  var year = (new Date()).getFullYear();
  if (year <= 2017) year = 2017;
  if (year >= 2060) year = 2060;
  document.write(year - since);
}

// Obfuscate e-mail address so that it can't trivially be
// scraped by web spiders crawling for spammable addresses
var idCounter = 0;
function mailto(a, b) {
  if (b) {
    document.write('<a href="mailto:Keen Construction"><canvas id="id' +
                   ++idCounter + '"></canvas></a>');
  } else {
    document.write('<span><canvas id="id' + ++idCounter + '"></canvas></span>');
  }
  var canvas = document.getElementById('id' + idCounter);
  window.addEventListener("load",
    (function(canvas) { return function() {
      // Combine the user name, an "@" character, and the domain into a
      // full e-mail address. But avoid ever having it permanently show up in
      // the DOM.
      var msg = (b ? atob(a) + String.fromCharCode(1 << 6) + atob(b) : a);
      var context = canvas.getContext('2d');
      canvas.onclick = function() {
        window.open('mailto:' + msg +
                    '?subject=Inquiry+from+website');
        return false;
      }
      // Temporarily create an invisible span element to determine the
      // dimensions of the rendered text.
      var span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.innerHTML = msg;
      document.body.appendChild(span);
      // Render the text at twice its natural resolution. This allows
      // it to be scaled back down properly, and works around poor
      // anti-aliasing when directly rendering text into a canvas.
      canvas.style.transform = 'scale(.5, .5)';
      canvas.style.transformOrigin = 'top left';
      canvas.width = span.offsetWidth * 2;
      canvas.height = span.offsetHeight * 2;
      canvas.parentNode.style.position = 'relative';
      canvas.style.position = 'absolute';
      var style = window.getComputedStyle(span);
      context.font =
        style.fontSize.replace(/([0-9]+)(.*)/,
                               function(_, size, unit) {
                                 return 2*parseInt(size, 10) + unit; }) +
        ' ' + style.fontFamily;
      context.fillStyle = style.color;
      context.textBaseline = 'bottom';
      // Now, render the email address as an image. It ideally should
      // visually be indistinguishable from normal text. But it is not
      // possible to extract it from the DOM without doing full optical
      // character recognition (OCR).
      context.fillText(msg, 0, canvas.height);
      document.body.removeChild(span);
    } })(canvas), false);
}

// Delay showing of images until the page is fully loaded. That's
// less visually jarring.
window.addEventListener("load",
  function() {
    Array.prototype.filter.call(
      document.getElementsByClassName('images'),
      function(element) {
        element.style.visibility = 'visible';
      });
  });
