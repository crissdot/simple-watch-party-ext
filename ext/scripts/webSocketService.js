function sendPlayEvent() {
  chrome.runtime.sendMessage({
    type: "PLAY_VIDEO"
  });
}

function sendPauseEvent() {
  chrome.runtime.sendMessage({
    type: "PAUSE_VIDEO"
  });
}