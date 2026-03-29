// PrimeVideo
function waitForVideoElement() {
  const observer = new MutationObserver((mutations, me) => {
    const isFullScreen = document.getElementsByClassName('dv-player-fullscreen').length;
    if (isFullScreen > 0) {
      const nVideos = document.getElementsByTagName('video').length;
      video = document.getElementsByTagName('video')[nVideos-1];
      if (video && video.src.startsWith('blob')) {
        addVideoPlayerListeners(video);
        me.disconnect();
        return;
      }
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
}