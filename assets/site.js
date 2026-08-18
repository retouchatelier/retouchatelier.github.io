/* Retouch Atelier - shared site tags.
   Every page loads this one file, so any future tag
   (Google Ads, Meta pixel, etc.) goes here only. */
(function(){
  var GA = "G-PYDSP0K07R";
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments) };
  gtag("js", new Date());
  gtag("config", GA);

  var p = location.pathname;

  /* A visitor who reaches the thank-you page has sent an enquiry. */
  if (p.indexOf("/thank-you") === 0) {
    gtag("event", "lead", { form_location: document.referrer || "direct" });
  }

  /* Instant-quote page: record when the quote form is actually sent. */
  if (p.indexOf("/start-a-project") === 0) {
    document.addEventListener("submit", function(e){
      if (e.target && e.target.tagName === "FORM") {
        gtag("event", "quote_submit");
      }
    }, true);
  }
})();

/* Before/after sliders on service pages (markup uses data-ba2). */
document.addEventListener('DOMContentLoaded', function () {
  [].forEach.call(document.querySelectorAll('[data-ba2]'), function (box) {
    var before = box.querySelector('[data-clip]');
    var handle = box.querySelector('.handle');
    if (!before) return;
    function set(pct) {
      if (pct < 2) pct = 2;
      if (pct > 98) pct = 98;
      before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      if (handle) handle.style.left = pct + '%';
    }
    function track(e) {
      var r = box.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    }
    var dragging = false;
    box.addEventListener('pointerdown', function (e) {
      dragging = true;
      if (box.setPointerCapture) { try { box.setPointerCapture(e.pointerId) } catch (err) {} }
      track(e); e.preventDefault();
    });
    box.addEventListener('pointermove', function (e) {
      if (dragging || e.pointerType === 'mouse') track(e);
    });
    window.addEventListener('pointerup', function () { dragging = false });
    set(50);
  });
});
