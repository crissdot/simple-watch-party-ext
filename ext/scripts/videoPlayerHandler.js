let playerControls = null;

function addVideoPlayerListeners() {
  video = getGlobalVideo();
  if (!video) return;

  console.log('Adding video player listeners', video);

  video.onplay = (event) => {
    console.log('onplay event');
    sendPlayEvent();
  };

  video.onpause = (event) => {
    console.log('onpause event');
    sendPauseEvent();
  };

  video.onseeked = (event) => {
    console.log('onseeked event');1
    // TODO send time event
  };

  // TODO
  // let lastCurrentTime;
  // video.addEventListener('timeupdate', () => {
  //   if (dataReceived?.startsWith('time:')) return;
  //   if (Math.abs(lastCurrentTime - video.currentTime) > 2) {
  //     ws.send('time:' + video.currentTime);
  //   }
  //   lastCurrentTime = video.currentTime;
  // });
}

function playVideo() {
  if (!video || !playerControls) console.log('Cannot play video remotely');
  if (video.paused) playerControls.click();
}

function pauseVideo() {
  if (!video || !playerControls) console.log('Cannot pause video remotely');
  if (!video.paused) playerControls.click();
}