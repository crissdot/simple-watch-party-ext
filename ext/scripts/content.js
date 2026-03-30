let isConnected = false;
console.log("Running on:", window.location.href);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received', message);
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
});

function init() {
  if (isConnected) {
    console.log('Watch Party already synced');
    return;
  }

  console.log("Extension clicked inside content script!");
  const video = getVideoElement();
  if (!video) {
    console.log('Cannot get video')
    return;
  }

  setGlobalVideo(video);
  chrome.runtime.sendMessage({
    type: "WS_INIT_EVENT"
  });
}

function connectedEvent() {
  console.log('connected event');
  addVideoPlayerListeners();
  isConnected = true;
}