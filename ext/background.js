importScripts("utils/Logger.js");

let clientId = null;
let ws = null;
let tabId = null;

chrome.action.onClicked.addListener((tab) => {
  tabId = tab.id;
  chrome.tabs.sendMessage(tabId, {
    action: "EXTENSION_CLICKED"
  });
});


function addWebSocketListeners() {
  if (ws) {
    logger.warn("WS already exists for id: " + clientId)
    chrome.tabs.sendMessage(tabId, {
      action: "WS_CONNECTED_EVENT",
    });
  } else {
    clientId = parseInt(Date.now() * Math.random());
    ws = new WebSocket("ws://localhost:8000/ws/" + clientId);
  }

  ws.onopen = function(event) {
    logger.info("Connected to WebSocket server. Your id is: " + clientId);
    chrome.tabs.sendMessage(tabId, {
      action: "WS_CONNECTED_EVENT",
    });
  };

  ws.onmessage = function(event) {
    logger.info("Message from server: ", event.data);
    const dataReceived = event.data;
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
      const time = dataReceived.split(':')[1];
      chrome.tabs.sendMessage(tabId, {
        action: "VIDEO_SEEKED_EVENT",
        payload: time,
      });
    };
  };

  ws.onclose = function(event) {
    logger.info("Disconnected from WebSocket server");
  };

  ws.onerror = function(error) {
    logger.error("WebSocket error: ", error);
    alert('An error occurred whyle trying to connect to server');
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "WS_INIT_EVENT") {
    logger.info("Init ws");
    addWebSocketListeners();
  }

  if (message.type === "VIDEO_PLAY_EVENT") {
    if (!ws) return;
    logger.info('Sending play event');
    ws.send('play');
  }

  if (message.type === "VIDEO_PAUSE_EVENT") {
    if (!ws) return;
    logger.info('Sending pause event');
    ws.send('pause');
  }

  if (message.type === "VIDEO_SEEKED_EVENT") {
    if (!ws) return;
    logger.info('Sending seeked event');
    ws.send('time:' + message.payload);
  }
});