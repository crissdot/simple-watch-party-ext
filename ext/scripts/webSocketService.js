function sendPlayEvent() {
  chrome.runtime.sendMessage({
    type: "VIDEO_PLAY_EVENT"
  });
}

function sendPauseEvent() {
  chrome.runtime.sendMessage({
    type: "VIDEO_PAUSE_EVENT"
  });
}