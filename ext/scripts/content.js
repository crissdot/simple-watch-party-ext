let isConnected = false;
logger.info("Running on:", window.location.href);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.info('Message received', message);
  if (message.action === "EXTENSION_CLICKED") {
    init();
    return;
  }
  if (message.action === "WS_CONNECTED_EVENT") {
    connectedEvent();
    return;
  }
  if (message.action === "VIDEO_PLAY_EVENT") {
    playVideo();
    return;
  }
  if (message.action === "VIDEO_PAUSE_EVENT") {
    pauseVideo();
    return;
  }
  if (message.action === "VIDEO_SEEKED_EVENT") {
    seekVideo(message.payload);
    return;
  }
});

function init() {
  if (isConnected) {
    logger.info('Watch Party already synced');
    return;
  }

  logger.info("Extension clicked inside content script!");
  const video = getVideoElement();
  if (!video) {
    logger.info('Cannot get video')
    return;
  }

  setGlobalVideo(video);
  chrome.runtime.sendMessage({
    type: "WS_INIT_EVENT"
  });
}

function connectedEvent() {
  logger.info('connected event');
  addVideoPlayerListeners();
  isConnected = true;
}