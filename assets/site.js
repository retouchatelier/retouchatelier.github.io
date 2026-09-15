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
/* One enquiry form, everywhere.
   Every form on the site posts to the same place, so it should ask the same
   questions. This normalises all of them in one file: business inbox on the cc,
   a required service, a required monthly volume, an optional phone number, and
   a required "how did you hear about us" as a fixed list rather than free text
   so the answers can actually be counted. */
(function () {
  var CC = "atelier@retouchatelier.com";
  var QUOTE = (location.pathname === "/start-a-project/");

  var SERVICES = [
    ["Apparel & fashion", [
      "Ghost Mannequin",
      "Apparel Retouching",
      "Model Retouching",
      "Lingerie & Swimwear Retouching",
      "Kids Fashion Retouching",
      "Footwear Retouching",
      "Handbag Retouching",
      "Eyewear Retouching",
      "Catalogue & Lookbook Retouching",
      "Accessories Retouching"
    ]],
    ["Product & still life", [
      "Packshot Retouching",
      "Product Photo Editing",
      "Jewelry Retouching",
      "Watch Retouching",
      "Cosmetics Retouching",
      "Skincare Product Retouching",
      "Beverage & Bottle Retouching",
      "Food Photography Retouching",
      "Furniture Retouching",
      "Home Decor Retouching",
      "Electronics Product Retouching",
      "Automotive Parts Retouching",
      "Toy Retouching"
    ]],
    ["Editing services", [
      "Clipping Path",
      "Background Removal",
      "Image Masking",
      "Shadow Creation",
      "Colour Correction",
      "Photo Culling"
    ]],
    ["Marketplace & property", [
      "Amazon Product Photo Editing",
      "Shopify Product Image Editing",
      "Etsy Product Photo Editing",
      "Real Estate Photo Editing"
    ]],
    ["Partnership", [
      "White-Label Retouching"
    ]]
  ];

  /* Which service this page is about. The buyer can still change it. */
  var PATHS = {
    "/ghost-mannequin-service/": "Ghost Mannequin",
    "/ghost-mannequin-production/": "Ghost Mannequin",
    "/apparel-retouching/": "Apparel Retouching",
    "/model-retouching/": "Model Retouching",
    "/lingerie-swimwear-retouching/": "Lingerie & Swimwear Retouching",
    "/kids-fashion-retouching/": "Kids Fashion Retouching",
    "/footwear-retouching/": "Footwear Retouching",
    "/handbag-retouching/": "Handbag Retouching",
    "/eyewear-retouching/": "Eyewear Retouching",
    "/catalog-lookbook-retouching/": "Catalogue & Lookbook Retouching",
    "/packshot-retouching/": "Packshot Retouching",
    "/accessories-retouching/": "Accessories Retouching",
    "/product-photo-editing/": "Product Photo Editing",
    "/jewelry-retouching/": "Jewelry Retouching",
    "/watch-retouching/": "Watch Retouching",
    "/cosmetics-retouching/": "Cosmetics Retouching",
    "/skincare-product-retouching/": "Skincare Product Retouching",
    "/beverage-bottle-retouching/": "Beverage & Bottle Retouching",
    "/food-photography-retouching/": "Food Photography Retouching",
    "/furniture-retouching/": "Furniture Retouching",
    "/home-decor-retouching/": "Home Decor Retouching",
    "/electronics-product-retouching/": "Electronics Product Retouching",
    "/automotive-parts-retouching/": "Automotive Parts Retouching",
    "/toy-retouching/": "Toy Retouching",
    "/clipping-path-service/": "Clipping Path",
    "/background-removal-service/": "Background Removal",
    "/image-masking-service/": "Image Masking",
    "/shadow-creation-service/": "Shadow Creation",
    "/color-correction-service/": "Colour Correction",
    "/photo-culling-service/": "Photo Culling",
    "/amazon-product-photo-editing/": "Amazon Product Photo Editing",
    "/shopify-product-image-editing/": "Shopify Product Image Editing",
    "/etsy-product-photo-editing/": "Etsy Product Photo Editing",
    "/real-estate-photo-editing/": "Real Estate Photo Editing",
    "/white-label-retouching/": "White-Label Retouching",
    "/white-label-partners/": "White-Label Retouching",
    "/fashion-studios/": "Apparel Retouching",
    "/product-studios/": "Product Photo Editing"
  };

  /* Bands, not a number box. The first one is the published disqualifier:
     under 500 a month and we are honest that we are the wrong studio. */
  var VOLUME = [
    "Fewer than 500 images a month",
    "500 to 2,000 images a month",
    "2,000 to 5,000 images a month",
    "5,000 to 15,000 images a month",
    "More than 15,000 images a month",
    "A one-off project, not monthly"
  ];

  var HEARD = [
    "Google or another search engine",
    "ChatGPT or another AI assistant",
    "LinkedIn",
    "Instagram or Pinterest",
    "Behance or Dribbble",
    "A colleague or a referral",
    "You emailed me",
    "A directory or review site",
    "Somewhere else"
  ];

  function css() {
    if (document.getElementById("ra-form-css")) return;
    var s = document.createElement("style");
    s.id = "ra-form-css";
    s.textContent =
      ".ra-sel,.ra-tel{width:100%;box-sizing:border-box;padding:12px 14px;" +
      "border:1px solid var(--line,#e2e8f0);border-radius:8px;" +
      "background:var(--surface,#fff);color:var(--text,#0f172a);" +
      "font-size:.95rem;font-family:inherit;line-height:1.2}" +
      ".ra-sel{-webkit-appearance:none;-moz-appearance:none;appearance:none;" +
      "background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns=" +
      "'http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' " +
      "fill='none' stroke='%2394a3b8' stroke-width='1.6'/%3E%3C/svg%3E\");" +
      "background-repeat:no-repeat;background-position:right 14px center;" +
      "padding-right:38px}" +
      ".ra-sel:focus,.ra-tel:focus{outline:none;border-color:var(--gold,#1d4ed8)}" +
      ".ra-sel:invalid{color:var(--muted2,#94a3b8)}" +
      ".ra-tel::placeholder{color:var(--muted2,#94a3b8)}" +
      ".ra-hid{display:none}" +
      "@media(max-width:640px){.ra-row{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  }

  function hidden(f, name, value) {
    var el = f.querySelector('input[name="' + name + '"]');
    if (el) { if (value !== null) el.value = value; return el; }
    el = document.createElement("input");
    el.type = "hidden"; el.name = name; el.value = value || "";
    f.insertBefore(el, f.firstChild);
    return el;
  }

  function field(labelText, node, id) {
    var w = document.createElement("div");
    w.className = "fld";
    var l = document.createElement("label");
    l.setAttribute("for", id);
    l.textContent = labelText;
    w.appendChild(l); w.appendChild(node);
    return w;
  }

  function select(id, name, placeholder, groups, chosen) {
    var s = document.createElement("select");
    s.id = id; s.name = name; s.required = true; s.className = "ra-sel";
    var o0 = document.createElement("option");
    o0.value = ""; o0.textContent = placeholder;
    o0.disabled = true; o0.selected = true;
    s.appendChild(o0);
    for (var g = 0; g < groups.length; g++) {
      var label = groups[g][0], items = groups[g][1], host = s;
      if (label) {
        host = document.createElement("optgroup");
        host.label = label;
        s.appendChild(host);
      }
      for (var i = 0; i < items.length; i++) {
        var o = document.createElement("option");
        o.value = items[i]; o.textContent = items[i];
        if (chosen && items[i] === chosen) { o.selected = true; o0.selected = false; }
        host.appendChild(o);
      }
    }
    return s;
  }

  function anchor(f) {
    /* Put new fields immediately before the submit button, or before the
       file uploader if the button sits somewhere else. */
    var b = f.querySelector('button[type="submit"], button:not([type]), input[type="submit"]');
    while (b && b.parentNode !== f) b = b.parentNode;
    return b || null;
  }

  function put(f, node) {
    var a = anchor(f);
    if (a) f.insertBefore(node, a); else f.appendChild(node);
  }

  /* Two per line, like the Name/Email row the pages already use. */
  function row(f, a, b) {
    var r = document.createElement("div");
    r.className = "frow ra-row";
    r.appendChild(a);
    if (b) r.appendChild(b);
    put(f, r);
    return r;
  }

  function guessService(f) {
    var h = f.querySelector('input[name="Service"]');
    if (h && h.value) return h.value;
    var p = location.pathname;
    if (PATHS[p]) return PATHS[p];
    return "";
  }

  function fix(f, n) {
    if (f.getAttribute("data-ra-form") === "1") return;
    f.setAttribute("data-ra-form", "1");

    /* 1. Business inbox. Only three pages carried this before. */
    hidden(f, "_cc", CC);
    hidden(f, "Page", location.pathname);

    /* 2 and 3. Service and monthly volume.
       /start-a-project/ already asks both, visibly, through the quote
       calculator that writes into its own hidden inputs. Leave that page
       alone — a second set of controls would fight with it. */
    if (!QUOTE) {
      var chosen = guessService(f);
      var old = f.querySelector('input[name="Service"]');
      if (old) old.parentNode.removeChild(old);
      var sid = "ra-svc-" + n;
      var svc = select(sid, "Service", "Choose the service you need", SERVICES, chosen);
      var vid = "ra-vol-" + n;
      var vol = select(vid, "Image volume", "Choose a monthly volume", [["", VOLUME]], "");
      row(f,
        field("Which service do you need?", svc, sid),
        field("How many images a month?", vol, vid));
    }

    /* 5. Where they came from. A list, so it can be counted.
       GA4 calls more than half of all sessions "direct", which tells us
       nothing. This field is the only honest attribution we have. */
    var oldHeard = f.querySelector('input[name="Heard about us"]');
    if (oldHeard && oldHeard.parentNode.className === "fld") {
      oldHeard.parentNode.parentNode.removeChild(oldHeard.parentNode);
    } else if (oldHeard) {
      oldHeard.parentNode.removeChild(oldHeard);
    }
    var hid = "ra-heard-" + n;
    var heard = select(hid, "Heard about us", "Choose one", [["", HEARD]], "");

    /* 4. Phone. Optional, on purpose — demanding it is how forms die.
       Sits beside the source question so the row stays two-up. */
    var telField = null;
    if (!f.querySelector('input[name="Phone"]')) {
      var pid = "ra-tel-" + n;
      var tel = document.createElement("input");
      tel.type = "tel"; tel.id = pid; tel.name = "Phone";
      tel.autocomplete = "tel"; tel.className = "ra-tel";
      tel.placeholder = "WhatsApp, with country code";
      telField = field("Phone (optional)", tel, pid);
    }
    row(f, field("How did you hear about us?", heard, hid), telField);

    var oid = "ra-heard-other-" + n;
    var other = document.createElement("input");
    other.type = "text"; other.id = oid; other.name = "Heard about us - detail";
    other.autocomplete = "off"; other.className = "ra-tel";
    other.placeholder = "Where exactly? It helps us more than you think";
    other.disabled = true;
    var otherWrap = field("Tell us where", other, oid);
    otherWrap.className = "fld ra-hid";
    put(f, otherWrap);

    heard.addEventListener("change", function () {
      var show = (heard.value === "Somewhere else" ||
                  heard.value === "A directory or review site" ||
                  heard.value === "A colleague or a referral");
      otherWrap.className = show ? "fld" : "fld ra-hid";
      other.disabled = !show;
      if (!show) other.value = "";
    });
  }

  function run() {
    var forms = document.querySelectorAll('form[action*="formsubmit"]');
    if (!forms.length) return;
    css();
    for (var i = 0; i < forms.length; i++) fix(forms[i], i);
  }

  /* Guarded by data-ra-form, so running more than once is free.
     Worth it: a form low on the page can still be unparsed at
     DOMContentLoaded, and some pages build theirs after load. */
  run();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  window.addEventListener("load", run);
  setTimeout(run, 1200);
})();

/* LinkedIn, put where a B2B buyer actually looks for it.
   Three places: the footer row on every page, the "Follow" line that
   named LinkedIn without linking to it, and the Organization schema,
   so Google knows the page and the site are the same business. */
(function () {
  var LI = "https://www.linkedin.com/company/retouch-atelier/";

  /* 1. Footer. First in the row — for this buyer it outranks the rest.
        There are two social rows down there, not one: the "Connect"
        column in the grid, and the strip along the very bottom. Both. */
  function foot() {
    var igs = document.querySelectorAll('footer a[href*="instagram.com"]');
    for (var i = 0; i < igs.length; i++) {
      var ig = igs[i], p = ig.parentNode;
      if (!p) continue;
      if (p.querySelector('a[href*="linkedin.com"]')) continue;
      var a = document.createElement("a");
      a.href = LI;
      a.textContent = "LinkedIn";
      a.target = "_blank";
      a.rel = "noopener";
      if (ig.className) a.className = ig.className;
      p.insertBefore(a, ig);
    }
  }

  /* 2. "Follow — Instagram · LinkedIn" was words, not links.
        Telling a buyer you are on LinkedIn and giving them nowhere to
        click is worse than not mentioning it. */
  function words() {
    var els = document.querySelectorAll("span, p, li, div");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length) continue;
      if (el.getAttribute("data-ra-li") === "1") continue;
      var t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (t.indexOf("LinkedIn") === -1) continue;
      if (el.closest && el.closest("a")) continue;
      var m = t.match(/^(Instagram)\s*[·•|,]\s*(LinkedIn)$/);
      if (m) {
        el.setAttribute("data-ra-li", "1");
        el.innerHTML =
          '<a href="https://www.instagram.com/retouchatelier.studio/" ' +
          'target="_blank" rel="noopener">Instagram</a> &middot; ' +
          '<a href="' + LI + '" target="_blank" rel="noopener">LinkedIn</a>';
      } else if (t === "LinkedIn") {
        el.setAttribute("data-ra-li", "1");
        el.innerHTML =
          '<a href="' + LI + '" target="_blank" rel="noopener">LinkedIn</a>';
      }
    }
  }

  /* 3. Organization schema. sameAs is how Google ties a website and a
        LinkedIn page to one entity. Instagram, Pinterest and Behance are
        already listed; LinkedIn was not, and /company/ had no list at all. */
  function schema() {
    var s = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < s.length; i++) {
      var data;
      try { data = JSON.parse(s[i].textContent); } catch (e) { continue; }
      var nodes = Array.isArray(data) ? data : [data];
      var touched = false;
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (!n || typeof n !== "object") continue;
        var type = n["@type"];
        type = Array.isArray(type) ? type.join(" ") : String(type || "");
        if (type.indexOf("Organization") === -1 &&
            type.indexOf("ProfessionalService") === -1 &&
            type.indexOf("LocalBusiness") === -1) continue;
        var same = n.sameAs;
        if (typeof same === "string") same = [same];
        if (!Array.isArray(same)) same = [];
        var found = false;
        for (var k = 0; k < same.length; k++) {
          if (String(same[k]).indexOf("linkedin.com") > -1) found = true;
        }
        if (found) continue;
        same.push(LI);
        n.sameAs = same;
        touched = true;
      }
      if (touched) s[i].textContent = JSON.stringify(data);
    }
  }

  function run() { foot(); words(); schema(); }

  /* The footer has two social rows and the second one sits near the very
     end of the document. Running once at DOMContentLoaded caught only the
     first — the bottom strip was not parsed yet. Every step below is
     guarded and idempotent, so running four times costs nothing and the
     late row is never missed again. */
  run();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  window.addEventListener("load", run);
  setTimeout(run, 1500);
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

/* The footer Services column is the most-repeated internal navigation on the
   site, so its order is what tells Google and an assistant what this studio
   actually is. Target work first; jewellery and watches keep their links but
   move to the end. Nothing is removed — removing links would cost those pages
   their crawl priority, and they still earn impressions. */
(function () {
  var LEAD = [["/ghost-mannequin-service/", "Ghost Mannequin"],
              ["/apparel-retouching/", "Apparel Retouching"],
              ["/packshot-retouching/", "Packshot Retouching"],
              ["/accessories-retouching/", "Accessories Retouching"],
              ["/catalog-lookbook-retouching/", "Catalogue Retouching"],
              ["/white-label-retouching/", "White-Label"]];
  var TAIL = ["/jewelry-retouching/", "/watch-retouching/"];

  function col() {
    var cols = document.querySelectorAll("footer .foot-col");
    for (var i = 0; i < cols.length; i++) {
      var h = cols[i].querySelector("h4");
      if (h && (h.textContent || "").trim() === "Services") return cols[i];
    }
    return null;
  }

  function run() {
    var c = col();
    if (!c || c.getAttribute("data-ra-svc") === "1") return;
    c.setAttribute("data-ra-svc", "1");

    for (var i = 0; i < LEAD.length; i++) {
      if (c.querySelector('a[href="' + LEAD[i][0] + '"]')) continue;
      var a = document.createElement("a");
      a.href = LEAD[i][0];
      a.textContent = LEAD[i][1];
      c.appendChild(a);
    }
    /* Push jewellery and watches to the bottom of the column. */
    for (var j = 0; j < TAIL.length; j++) {
      var t = c.querySelector('a[href="' + TAIL[j] + '"]');
      if (t) c.appendChild(t);
    }
    /* Re-order the lead links above them, in the order declared. */
    for (var k = LEAD.length - 1; k >= 0; k--) {
      var el = c.querySelector('a[href="' + LEAD[k][0] + '"]');
      var first = c.querySelector("h4");
      if (el && first && first.nextSibling) c.insertBefore(el, first.nextSibling);
    }
  }

  run();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  window.addEventListener("load", run);
  setTimeout(run, 1500);
})();

/* The private gallery.
   Most of the studio's work is under NDA and never reaches the website, so the
   portfolio shows the small part that can be published. This turns that from a
   gap into the reason to make contact: one click opens a pre-written email, the
   buyer presses send, and the studio replies with the full-resolution set.

   The draft carries two optional blank lines. A bare mailto returns an address
   and nothing else; if the buyer fills them in we learn what they shoot and at
   what volume, and if they do not, the email still sends. */
(function () {
  var TO = "atelier@retouchatelier.com";
  /* The studio inbox is copied in so the request is visible in Gmail the moment
     it is sent, without waiting on forwarding. The buyer writes to atelier@,
     which is the address on every page. */
  var CC = "retouchatelier.studio@gmail.com";
  var SUBJECT = "Private gallery request";
  var BODY = [
    "Hello Retouch Atelier,",
    "",
    "Please send me the private gallery — the full-resolution before and after",
    "work you don't publish.",
    "",
    "What I shoot:",
    "Roughly how many images a month:",
    "",
    "Thanks,"
  ].join("\n");

  var E = encodeURIComponent;

  /* Three routes to the same email, because one is never enough.
     mailto covers Outlook and Apple Mail, which is most business desktops and
     every phone. It does nothing at all on a machine with no mail handler set,
     which is common for people who live in webmail — so those two get a direct
     compose link instead. */
  var HREF = "mailto:" + TO +
             "?cc=" + E(CC) +
             "&subject=" + E(SUBJECT) +
             "&body=" + E(BODY);

  var GMAIL = "https://mail.google.com/mail/?view=cm&fs=1" +
              "&to=" + E(TO) + "&cc=" + E(CC) +
              "&su=" + E(SUBJECT) + "&body=" + E(BODY);

  var OUTLOOK = "https://outlook.office.com/mail/deeplink/compose" +
                "?to=" + E(TO) + "&cc=" + E(CC) +
                "&subject=" + E(SUBJECT) + "&body=" + E(BODY);

  function css() {
    if (document.getElementById("ra-gal-css")) return;
    var s = document.createElement("style");
    s.id = "ra-gal-css";
    s.textContent =
      ".ra-gal{border:1px solid var(--line,#e2e8f0);border-radius:12px;" +
      "padding:30px 32px;margin:0 auto;max-width:780px;background:var(--surface,#fff)}" +
      ".ra-gal .ra-gal-e{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;" +
      "color:var(--gold,#1d4ed8);margin-bottom:12px}" +
      ".ra-gal h3{font-family:var(--serif,Georgia,serif);font-weight:500;" +
      "font-size:clamp(1.25rem,2.4vw,1.6rem);margin:0 0 12px;color:var(--text,#0f172a);line-height:1.3}" +
      ".ra-gal p{color:var(--muted,#475569);font-size:1rem;line-height:1.7;margin:0 0 20px;max-width:62ch}" +
      ".ra-gal .ra-gal-alt{font-size:.85rem;color:var(--muted2,#94a3b8);margin:14px 0 0}" +
      ".ra-gal .ra-gal-alt a{color:var(--gold,#1d4ed8);text-decoration:none;border-bottom:1px solid var(--line,#e2e8f0)}" +
      ".ra-gal .ra-gal-note{font-size:.84rem;color:var(--muted2,#94a3b8);margin:10px 0 0}" +
      ".ra-gal .ra-gal-note a{color:var(--muted2,#94a3b8)}" +
      ".ra-gal-wrap{padding:44px 0}";
    document.head.appendChild(s);
  }

  function block(where) {
    var sec = document.createElement("section");
    sec.className = "ra-gal-wrap";
    sec.setAttribute("data-ra-gal", "1");
    sec.innerHTML =
      '<div class="wrap"><div class="ra-gal">' +
      '<div class="ra-gal-e">The work we cannot publish</div>' +
      '<h3>Most of what we retouch never reaches this website.</h3>' +
      '<p>Client catalogues sit under NDA, so the pairs shown here are the small ' +
      'part we are free to publish. The private gallery is the rest of it — ' +
      'full resolution, before and after, so you can judge the work at the size ' +
      'you would actually deliver it.</p>' +
      '<a class="btn btn-gold" href="' + HREF + '" data-ra-gal-link="' + where + '">' +
      'Ask for the private gallery</a>' +
      '<div class="ra-gal-alt">or open it in ' +
      '<a href="' + GMAIL + '" target="_blank" rel="noopener" ' +
      'data-ra-gal-link="' + where + '-gmail">Gmail</a> &middot; ' +
      '<a href="' + OUTLOOK + '" target="_blank" rel="noopener" ' +
      'data-ra-gal-link="' + where + '-outlook">Outlook</a></div>' +
      '<p class="ra-gal-note">Opens an email that is already written — press send. ' +
      'We reply with the link the same working day, Monday to Saturday. ' +
      'Or write to <a href="mailto:' + TO + '">' + TO + '</a>.</p>' +
      '</div></div>';
    return sec;
  }

  var done = false;
  function place() {
    if (done || document.querySelector("[data-ra-gal]")) return;

    var form = document.querySelector('form[action*="formsubmit"]');
    var formSec = form ? form.closest("section") : null;
    var cta = document.querySelector("section.cta-band");
    var anchor = cta || formSec;
    if (!anchor || !anchor.parentNode) return;

    css();
    done = true;
    anchor.parentNode.insertBefore(block("before-form"), anchor);

    /* Where the buyer has just finished looking at real work, put it there too.
       Only on pages carrying a genuine set of before/after pairs. */
    var pairs = document.querySelectorAll(".ba");
    if (pairs.length >= 3) {
      var proof = pairs[pairs.length - 1].closest("section");
      /* Skip it if the proof block would land right next to the one above the
         form. Two identical panels in a row reads as nagging. */
      var adjacent = proof && (proof.nextElementSibling === anchor ||
                     (proof.nextElementSibling && proof.nextElementSibling.getAttribute &&
                      proof.nextElementSibling.getAttribute("data-ra-gal") === "1"));
      if (proof && proof !== anchor && proof.parentNode && !adjacent) {
        proof.parentNode.insertBefore(block("after-proof"), proof.nextSibling);
      }
    }

    /* The portfolio is the one page a buyer opens specifically to judge the
       work. They should learn there is more before scrolling fifteen pairs,
       not after. */
    if (location.pathname === "/portfolio/") {
      var secs = document.querySelectorAll("section");
      for (var i = 0; i < secs.length; i++) {
        if (secs[i].getAttribute("data-ra-gal") === "1") continue;
        if (secs[i].querySelector(".ba") || secs[i] === anchor) break;
        if (secs[i].parentNode) {
          secs[i].parentNode.insertBefore(block("portfolio-top"), secs[i].nextSibling);
        }
        break;
      }
    }
  }

  /* A mailto click is invisible to analytics unless it is reported.
     Without this we would never know whether any of it works. */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("[data-ra-gal-link]") : null;
    if (!a) return;
    if (typeof gtag === "function") {
      gtag("event", "gallery_request", {
        placement: a.getAttribute("data-ra-gal-link"),
        page_path: location.pathname
      });
    }
  }, true);

  place();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", place);
  window.addEventListener("load", place);
  setTimeout(place, 1500);
})();
