# 꿈씨앗 책방 - 어린이 동화 애드센스 준비 웹

이 폴더는 기존 작업 폴더에서 **어린이 동화 관련 파일만 따로 모은 배포용 웹 폴더**입니다.

## 폴더 구성

- `index.html` : 동화 13권 책장 메인 페이지
- `stories/` : 동화 읽기 페이지
- `assets/` : 표지/삽화 이미지
- `tistory-posts/` : 티스토리용 동화 포스트 HTML
- `adsense-config.js` : 애드센스 게시자 ID/슬롯 설정
- `adsense-loader.js`, `adsense.css` : 광고 영역 로더/스타일
- `ads.txt`, `robots.txt`, `sitemap.xml` : 애드센스/검색엔진 제출 준비 파일

## 애드센스 연결 방법

1. 이 폴더를 GitHub Pages, Netlify, Vercel 같은 정적 호스팅에 올립니다.
2. 애드센스 사이트 심사에서 배포된 도메인을 등록합니다.
3. 애드센스 승인 후 `adsense-config.js`를 열어 아래 값을 바꿉니다.

```js
window.DREAMSEED_ADSENSE = {
  enabled: true,
  client: "ca-pub-실제게시자ID",
  slots: {
    homeTop: "실제광고슬롯ID",
    homeMiddle: "실제광고슬롯ID",
    storyBottom: "실제광고슬롯ID"
  }
};
```

4. `ads.txt`의 `pub-XXXXXXXXXXXXXXXX`도 실제 게시자 ID 숫자로 교체합니다.
5. `robots.txt`, `sitemap.xml`의 `https://YOUR-DOMAIN.com`을 실제 도메인으로 교체합니다.

## 주의

- 승인 전에는 `enabled: false` 상태라 실제 광고 스크립트가 로드되지 않고 자리 표시만 보입니다.
- 애드센스는 콘텐츠, 개인정보처리방침, 문의/운영자 정보, 충분한 텍스트 페이지가 있으면 승인 가능성이 올라갑니다.
- 아이 대상 콘텐츠는 과도한 광고 배치보다 읽기 경험을 우선해야 합니다.
