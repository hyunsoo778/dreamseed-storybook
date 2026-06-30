(function () {
  "use strict";
  var id = new URLSearchParams(window.location.search).get("id");
  var story = window.SHORT_STORIES[id];
  var book = document.getElementById("book");
  var error = document.getElementById("bookError");

  if (!story) {
    error.style.display = "grid";
    document.querySelector(".book-controls").style.display = "none";
    return;
  }

  document.title = story.title + " | 꿈씨앗 책방";
  document.getElementById("footerMessage").textContent = story.ending;

  function pageImage() {
    return '<div class="scene-art" aria-hidden="true"><img class="scene-image" src="' +
      story.image + '" alt=""></div>';
  }

  var html = '<article class="page cover active" data-page="0">' +
    '<img class="cover-art" src="' + story.image + '" alt="' + story.title + ' 표지">' +
    '<div class="cover-shade"></div><div class="cover-copy">' +
    '<p class="eyebrow">' + story.intro + '</p><h1>' + story.title + '</h1>' +
    '<p class="author">글 · 그림 꿈씨앗 책방</p>' +
    '<button class="start-button" type="button">이야기 시작하기 <span>→</span></button></div>' +
    '<p class="age">' + story.age + ' · 약 3분</p></article>';

  story.pages.forEach(function (page, index) {
    html += '<article class="page story-page short-page" data-page="' + (index + 1) + '">' +
      pageImage() + '<div class="story-card"><span class="chapter">' + page[0] + '</span>' +
      '<p>' + page[1] + '</p><p class="dialogue">' + page[2] + '</p></div></article>';
  });

  html += '<article class="page ending" data-page="6"><div class="ending-stars">✦　·　✧　·　✦</div>' +
    '<div class="ending-icon">' + story.icon + '</div><p class="the-end">끝</p>' +
    '<h2>' + story.ending + '</h2><p class="question">' + story.question + '</p>' +
    '<button class="restart-button" type="button">처음부터 다시 읽기 ↻</button></article>';

  book.insertAdjacentHTML("beforeend", html);
  var script = document.createElement("script");
  script.src = "../../script.js";
  document.body.appendChild(script);
})();
