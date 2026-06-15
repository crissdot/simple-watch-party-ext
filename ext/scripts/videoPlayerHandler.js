let playerControls = null;

function addVideoPlayerListeners() {
  video = getGlobalVideo();
  if (!video) return;

  logger.info('Adding video player listeners', video);

  video.onplay = () => {
    logger.info('onplay event');
    sendPlayEvent();
  };

  video.onpause = () => {
    logger.info('onpause event');
    sendPauseEvent();
  };

  video.onseeked = () => {
    logger.info('onseeked event');
    sendSeekedEvent(video.currentTime);
  };
}

function playVideo() {
  video = getGlobalVideo();
  logger.info('Playing video', video);
  if (!video || !video.paused) {
    logger.info('Cannot play video remotely');
    return;
  }
  video.play();
}

function pauseVideo() {
  video = getGlobalVideo();
  logger.info('Pausing video', video);
  if (!video || video.paused) {
    logger.info('Cannot pause video remotely');
    return;
  }
  video.pause();
}

function seekVideo(newTime) {
  video = getGlobalVideo();
  logger.info('Seeking video with new time', newTime);
  if (!video || Math.abs(newTime - video.currentTime) < 2) {
    logger.info('Cannot seek video remotely');
    return;
  }
  video.currentTime = newTime;
}