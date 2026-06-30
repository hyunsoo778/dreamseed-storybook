(function () {
  "use strict";

  var config = window.DREAMSEED_ADSENSE || {};
  var client = String(config.client || "").trim();
  var enabled = Boolean(config.enabled);
  var isConfigured = /^ca-pub-\d{10,}$/.test(client);

  function showSetupNotice(slot) {
    slot.classList.add("ad-placeholder");
    slot.innerHTML = '<span>광고 영역</span><small>애드센스 승인 후 adsense-config.js에서 enabled와 ca-pub ID를 설정하세요.</small>';
  }

  function loadGoogleScript() {
    if (document.querySelector('script[data-dreamseed-adsense="true"]')) return;
    var script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.dreamseedAdsense = "true";
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(client);
    document.head.appendChild(script);
  }

  function activateSlot(slot) {
    var slotName = slot.dataset.slotName || "storyBottom";
    var adSlot = config.slots && config.slots[slotName] ? config.slots[slotName] : "0000000000";
    slot.innerHTML = "";

    var ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.dataset.adClient = client;
    ins.dataset.adSlot = adSlot;
    ins.dataset.adFormat = slot.dataset.adFormat || "auto";
    ins.dataset.fullWidthResponsive = "true";
    slot.appendChild(ins);

    window.adsbygoogle = window.adsbygoogle || [];
    try {
      window.adsbygoogle.push({});
    } catch (error) {
      console.warn("AdSense slot could not be pushed yet:", error);
    }
  }

  function init() {
    var slots = Array.prototype.slice.call(document.querySelectorAll("[data-ad-slot-placeholder]"));
    if (!slots.length) return;

    if (!enabled || !isConfigured) {
      slots.forEach(showSetupNotice);
      return;
    }

    loadGoogleScript();
    slots.forEach(activateSlot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
