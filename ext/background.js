let ws = null;
let dataReceived = null;
let tabId = null;

chrome.action.onClicked.addListener((tab) => {
  tabId = tab.id;
  chrome.tabs.sendMessage(tabId, {
    action: "EXTENSION_CLICKED"
  });
});


function addWebSocketListeners() {
  const clientId = parseInt(Date.now() * Math.random());
  ws = new WebSocket("ws://localhost:8000/ws/" + clientId);

  ws.onopen = function(event) {
    console.log("Connected to WebSocket server. Your id is: " + clientId);
    chrome.tabs.sendMessage(tabId, {
      action: "WS_CONNECTED_EVENT",
    });
  };

  ws.onmessage = function(event) {
    console.log("Message from server: ", event.data);
    dataReceived = event.data;
    if (dataReceived === 'play') {
      chrome.tabs.sendMessage(tabId, {
        action: "VIDEO_PLAY_EVENT",
      });
    }
    if (dataReceived === 'pause') {
      chrome.tabs.sendMessage(tabId, {
        action: "VIDEO_PAUSE_EVENT",
      });
    }
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
  if (message.type === "WS_INIT_EVENT") {
    console.log("Init ws");
    addWebSocketListeners();
  }

  if (message.type === "VIDEO_PLAY_EVENT") {
    if (!ws) return;
    if (dataReceived === 'play') return;
    console.log('Sending play event');
    ws.send('play');
  }

  if (message.type === "VIDEO_PAUSE_EVENT") {
    if (!ws) return;
    if (dataReceived === 'pause') return;
    console.log('Sending pause event');
    ws.send('pause');
  }
});