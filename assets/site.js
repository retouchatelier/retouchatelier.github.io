/* Retouch Atelier - shared site tags.
   Every page loads this one file, so any future tag
   (Google Ads, Meta pixel, etc.) goes here only. */
(function(){
    /* Our own testing traffic never reaches Analytics.
     Turn on  in a browser console:  localStorage.setItem("ra_notrack","1")
     Turn off in a browser console:  localStorage.removeItem("ra_notrack")   */
  /* One-tap switch for our own devices, phones included.
     Turn OFF analytics on a device:  retouchatelier.com/?notrack=1
     Turn it back ON:                 retouchatelier.com/?notrack=0   */
  try {
    var _nt = location.search.indexOf("notrack=1") > -1 ? 1
            : location.search.indexOf("notrack=0") > -1 ? 0 : -1;
    if (_nt > -1) {
      if (_nt) localStorage.setItem("ra_notrack", "1");
      else localStorage.removeItem("ra_notrack");
      document.addEventListener("DOMContentLoaded", function () {
        var n = document.createElement("div");
        n.textContent = _nt ? "Analytics is now OFF on this device." : "Analytics is now ON for this device.";
        n.setAttribute("style", "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:99999;background:#0b0b0d;color:#fff;font:14px/1.5 system-ui,sans-serif;padding:12px 20px;border-radius:3px;box-shadow:0 6px 24px rgba(0,0,0,.3)");
        document.body.appendChild(n);
        setTimeout(function () { n.remove(); }, 5000);
      });
    }
  } catch (e) {}

  try {
    if (window.localStorage && localStorage.getItem("ra_notrack") === "1") return;
  } catch (e) {}

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


  /* Language switcher: which languages visitors actually ask for.
     Fires language_switch with the language they picked. */
  document.addEventListener("change", function (e) {
    var el = e.target;
    if (!el || el.id !== "langSel") return;
    gtag("event", "language_switch", {
      language_to: el.value,
      page_path: location.pathname
    });
  }, true);
})();
/* Ask every enquiry where it came from.
   Partnerships, communities and word of mouth leave no UTM,
   so this one field is the only honest attribution we have. */
(function () {
  function addField() {
    var forms = document.querySelectorAll('form[action*="formsubmit"]');
    for (var i = 0; i < forms.length; i++) {
      var f = forms[i];
      if (f.querySelector('[name="Heard about us"]')) continue;
      var wrap = document.createElement("div");
      wrap.className = "fld";
      var id = "ra-heard-" + i;
      var lab = document.createElement("label");
      lab.setAttribute("for", id);
      lab.textContent = "How did you hear about us?";
      var inp = document.createElement("input");
      inp.type = "text"; inp.id = id; inp.name = "Heard about us";
      inp.autocomplete = "off";
      inp.placeholder = "Search, LinkedIn, a colleague, somewhere else";
      wrap.appendChild(lab); wrap.appendChild(inp);
      var btn = f.querySelector('button[type="submit"], button:not([type]), input[type="submit"]');
      if (btn && btn.parentNode === f) f.insertBefore(wrap, btn);
      else f.appendChild(wrap);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addField);
  else addField();
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

/* Nav link repair, 24 August 2026.
   The homepage was trimmed to seven sections and no longer has the
   #portfolio, #pricing or #enterprise anchors, but the nav and footer on
   every page still point at them. Send those links to the real pages.
   Remove this block once the HTML on each page has been corrected. */
(function () {
  var MAP = {
    "#portfolio":  "/portfolio/",
    "#pricing":    "/pricing/",
    "#enterprise": "/#contact"
  };
  function repair() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (!href) continue;
      var frag = null;
      for (var k in MAP) {
        if (href.slice(-k.length) === k) { frag = k; break; }
      }
      if (!frag) continue;
      var base = href.slice(0, href.length - frag.length);
      if (base === "" || base === "/" ||
          base === "https://retouchatelier.com/" ||
          base === "http://retouchatelier.com/") {
        links[i].setAttribute("href", MAP[frag]);
      }
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", repair);
  else repair();
})();

/* HubSpot Conversations - live chat. Portal 246735879. */
(function(){if(location.search.indexOf('ra_notrack=1')>-1)return;var s=document.createElement('script');s.id='hs-script-loader';s.async=true;s.defer=true;s.src='https://js-na2.hs-scripts.com/246735879.js';document.head.appendChild(s);})();

/* Studio clock loader. */
(function(){var s=document.createElement('script');s.src='/assets/clock.js';s.defer=true;document.head.appendChild(s);})();
