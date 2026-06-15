function sendPlayEvent() {
  if (sendEvent) {
    chrome.runtime.sendMessage({
      type: "VIDEO_PLAY_EVENT",
    });
  }
  sendEvent = true;
}

function sendPauseEvent() {
  if (sendEvent) {
    chrome.runtime.sendMessage({
      type: "VIDEO_PAUSE_EVENT",
    });
  }
  sendEvent = true;
}

function sendSeekedEvent(currentTime) {
  if (sendEvent) {
    chrome.runtime.sendMessage({
      type: "VIDEO_SEEKED_EVENT",
      payload: currentTime,
    });
  }
  sendEvent = true;
}