// Google AdSense 설정 파일
// 1) 애드센스 승인 후 ca-pub-XXXXXXXXXXXXXXXX 값을 실제 게시자 ID로 바꾸세요.
// 2) 광고 단위(slot)를 만들면 data-ad-slot 값도 실제 슬롯 ID로 바꾸면 됩니다.
window.DREAMSEED_ADSENSE = {
  enabled: false, // 승인 전에는 false 권장. 승인 후 true로 변경
  client: "ca-pub-XXXXXXXXXXXXXXXX",
  slots: {
    homeTop: "0000000001",
    homeMiddle: "0000000002",
    storyBottom: "0000000003"
  }
};
