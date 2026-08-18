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
