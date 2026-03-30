chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {
    action: "EXTENSION_CLICKED"
  });
});

let ws = null;
let dataReceived = null;

function addWebSocketListeners() {
  const clientId = parseInt(Date.now() * Math.random());
  ws = new WebSocket("ws://localhost:8000/ws/" + clientId);

  ws.onopen = function(event) {
    console.log("Connected to WebSocket server. Your id is: " + clientId);
    addVideoPlayerListeners();
    isConnected = true;
  };

  ws.onmessage = function(event) {
    console.log("Message from server: ", event.data);
    dataReceived = event.data;
    if (dataReceived === 'play') playVideo();
    if (dataReceived === 'pause') pauseVideo();
    if (dataReceived.startsWith('time:')) {
      // TODO
      // const time = dataReceived.split(':')[1];
      // lastCurrentTime = time;
      // video.currentTime = time;
    };
  };

  ws.onclose = function(event) {
    console.log("Disconnected from WebSocket server");
  };

  ws.onerror = function(error) {
    console.error("WebSocket error: ", error);
    alert('An error occurred whyle trying to connect to server');
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "INIT_WS") {
    console.log("Init ws");
    addWebSocketListeners();
  }

  if (message.type === "PLAY_VIDEO") {
    if (!ws) return;
    if (dataReceived === 'play') return;
    console.log('Sending play event');
    ws.send('play');
  }

  if (message.type === "PAUSE_VIDEO") {
    if (!ws) return;
    if (dataReceived === 'pause') return;
    console.log('Sending pause event');
    ws.send('pause');
  }
});