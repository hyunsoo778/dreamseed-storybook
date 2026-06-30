(function () {
  "use strict";

  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
  var prevButton = document.querySelector(".prev");
  var nextButton = document.querySelector(".next");
  var startButton = document.querySelector(".start-button");
  var restartButton = document.querySelector(".restart-button");
  var currentPageLabel = document.querySelector("#currentPage");
  var progressBar = document.querySelector("#progressBar");
  var soundButton = document.querySelector("#soundButton");
  var book = document.querySelector("#book");

  var currentPage = 0;
  var audioContext = null;
  var soundOn = false;
  var touchStartX = 0;

  function playChime(direction) {
    if (!soundOn) return;

    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioContext) audioContext = new AudioContextClass();

    var now = audioContext.currentTime;
    var notes = direction > 0 ? [523.25, 659.25] : [659.25, 523.25];

    notes.forEach(function (frequency, index) {
      var oscillator = audioContext.createOscillator();
      var gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.001, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now + index * 0.08);
      oscillator.stop(now + index * 0.08 + 0.4);
    });
  }

  function updateControls() {
    if (prevButton) prevButton.disabled = currentPage === 0;
    if (nextButton) nextButton.disabled = currentPage === pages.length - 1;

    if (currentPageLabel) {
      currentPageLabel.textContent = currentPage === 0 ? "표지" : currentPage + "장";
    }

    if (progressBar && pages.length > 1) {
      progressBar.style.width =
        (currentPage / (pages.length - 1)) * 100 + "%";
    }
  }

  function showPage(index) {
    if (index < 0 || index >= pages.length || index === currentPage) return;

    var direction = index > currentPage ? 1 : -1;
    if (direction > 0) {
      pages[currentPage].classList.add("leaving-left");
    } else {
      pages[currentPage].classList.remove("leaving-left");
    }
    pages[currentPage].classList.remove("active");

    currentPage = index;
    pages[currentPage].classList.remove("leaving-left");
    pages[currentPage].classList.add("active");

    updateControls();
    playChime(direction);
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      showPage(currentPage - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showPage(currentPage + 1);
    });
  }

  if (startButton) {
    startButton.addEventListener("click", function () {
      showPage(1);
    });
  }

  if (restartButton) {
    restartButton.addEventListener("click", function () {
      showPage(0);
    });
  }

  if (soundButton) {
    soundButton.addEventListener("click", function () {
      var label = soundButton.querySelector(".sound-label");
      soundOn = !soundOn;
      soundButton.setAttribute("aria-pressed", String(soundOn));
      if (label) label.textContent = soundOn ? "소리 끄기" : "소리 켜기";
      if (soundOn) playChime(1);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") showPage(currentPage + 1);
    if (event.key === "ArrowLeft") showPage(currentPage - 1);
  });

  if (book) {
    book.addEventListener(
      "touchstart",
      function (event) {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    book.addEventListener(
      "touchend",
      function (event) {
        var distance = event.changedTouches[0].screenX - touchStartX;
        if (Math.abs(distance) < 50) return;
        showPage(currentPage + (distance < 0 ? 1 : -1));
      },
      { passive: true }
    );
  }

  updateControls();
})();
