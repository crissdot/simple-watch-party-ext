function getVideoElement() {
  if (window.location.hostname.includes('crunchyroll.com')) return getCrunchyrollVideoElement();
}

// Crunchyroll
function getCrunchyrollVideoElement() {
  // Old version
  if (window.location.hostname.includes('static.crunchyroll.com')) {
    console.log('Getting video element for crunchyroll old player');
    return document.getElementById('player0');
  }
  return document.getElementsByTagName("video")[0];
}

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