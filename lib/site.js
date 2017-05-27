// Select that page that should be shown.
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
  document.write('<canvas id="emailaddress"></canvas>');
  var msg = atob(a) + String.fromCharCode(1 << 6) + atob(b);
  var canvas = document.getElementById('emailaddress');
  var context = canvas.getContext('2d');
  canvas.onclick = function() {
    window.open('mailto:' + msg.split(' ')[1] + '?subject=Inquiry+from+website');
  }
  var span = document.createElement('span');
  span.innerHTML = msg;
  document.body.appendChild(span);
  canvas.width = span.offsetWidth;
  canvas.height = span.offsetHeight;
  document.body.removeChild(span);
  var data = '\
    <svg xmlns="http://www.w3.org/2000/svg">\
      <foreignObject width="100%" height="100%">\
        <span xmlns="http://www.w3.org/1999/xhtml" \
              style="font-family: Arial, Helvetica, adobe-helvetica, \
                                  Arial Narrow, sans-serif; \
                     color: white; font-size: 16px">' +
          msg + '\
        </span>\
      </foreignObject>\
    </svg>';
  var dom = window.URL || window.webkitURL || window;
  var img = new Image();
  var svg = new Blob([data], { type: 'image/svg+xml' });
  var url = dom.createObjectURL(svg);
  img.onload = function() {
    context.drawImage(img, 0, 0);
    dom.revokeObjectURL(url);
  };
  img.src = url;
}
