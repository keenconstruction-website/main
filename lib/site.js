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

// Obfuscate e-mail address so that it can't trivially be
// scraped by web spiders crawling for spammable addresses
function mailto(a, b) {
  document.write('<a href="mailto:"><canvas id="emailaddress"></canvas></a>');
  window.addEventListener("load",
    function() {
      var msg = atob(a) + String.fromCharCode(1 << 6) + atob(b);
      var canvas = document.getElementById('emailaddress');
      var context = canvas.getContext('2d');
      canvas.onclick = function() {
        window.open('mailto:' + msg.split(' ')[1] +
                    '?subject=Inquiry+from+website');
        return false;
      }
      var span = document.createElement('span');
      span.innerHTML = msg;
      document.body.appendChild(span);
      canvas.width = span.offsetWidth+5;
      canvas.height = span.offsetHeight+5;
      var style = window.getComputedStyle(span);
      context.imageSmoothingEnabled = false;
      context.font = style.fontSize + ' ' + style.fontFamily;
      context.fillStyle = style.color;
      context.textBaseline = 'top';
      context.fillText(msg, 0, 2);
      document.body.removeChild(span);
    }, false);
}
