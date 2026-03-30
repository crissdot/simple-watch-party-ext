chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Running on:", window.location.href);
  if (message.action === "EXTENSION_CLICKED") {
    init();
  }
});

let isConnected = false;

function init() {
  if (isConnected) {
    console.log('Watch Party already synced');
    return;
  }

  console.log("Extension clicked inside content script!");
  video = getVideoElement();
  if (!video) {
    console.log('Cannot get video')
    return;
  }

  chrome.runtime.sendMessage({
    type: "INIT_WS"
  });
}