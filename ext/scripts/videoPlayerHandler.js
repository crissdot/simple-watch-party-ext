let playerControls = null;

function addVideoPlayerListeners() {
  video = getGlobalVideo();
  if (!video) return;

  console.log('Adding video player listeners', video);

  video.onplay = () => {
    console.log('onplay event');
    sendPlayEvent();
  };

  video.onpause = () => {
    console.log('onpause event');
    sendPauseEvent();
  };

  video.onseeked = () => {
    console.log('onseeked event');
    sendSeekedEvent(video.currentTime);
  };
}

function playVideo() {
  video = getGlobalVideo();
  console.log('Playing video', video);
  if (!video || !video.paused) {
    console.log('Cannot play video remotely');
    return;
  }
  video.play();
}

function pauseVideo() {
  video = getGlobalVideo();
  console.log('Pausing video', video);
  if (!video || video.paused) {
    console.log('Cannot pause video remotely');
    return;
  }
  video.pause();
}

function seekVideo(newTime) {
  video = getGlobalVideo();
  console.log('Seeking video with new time', newTime);
  if (!video || Math.abs(newTime - video.currentTime) < 2) {
    console.log('Cannot seek video remotely');
    return;
  }
  video.currentTime = newTime;
}