let video;
let dataReceived;

function waitForVideoElement() {
  const observer = new MutationObserver((mutations, me) => {
    const isFullScreen = document.getElementsByClassName('dv-player-fullscreen').length;
    if (isFullScreen > 0) {
      const nVideos = document.getElementsByTagName('video').length;
      video = document.getElementsByTagName('video')[nVideos-1];
      if (video && video.src.startsWith('blob')) {
        addVideoPlayerListeners(video);
        me.disconnect();
        return;
      }
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
}

function addVideoPlayerListeners(video) {
  let lastCurrentTime;
  video.addEventListener('play', () => {
    if (dataReceived === 'play') return;
    ws.send('play');
  });
  video.addEventListener('pause', () => {
    if (dataReceived === 'pause') return;
    ws.send('pause');
  });
  video.addEventListener('timeupdate', () => {
    if (dataReceived?.startsWith('time:')) return;
    if (Math.abs(lastCurrentTime - video.currentTime) > 2) {
      ws.send('time:' + video.currentTime);
    }
    lastCurrentTime = video.currentTime;
  });
}

waitForVideoElement();

const clientId = parseInt(Date.now() * Math.random());
const ws = new WebSocket("wss://localhost:8000/ws/" + clientId);

ws.onopen = function(event) {
    console.log("Connected to WebSocket server");
};

ws.onmessage = function(event) {
    console.log("Message from server: ", event.data);
    dataReceived = event.data;
    if (!video) return;
    if (dataReceived === 'play') video.play();
    if (dataReceived === 'pause') video.pause();
    if (dataReceived.startsWith('time:')) {
      const time = dataReceived.split(':')[1];
      lastCurrentTime = time;
      video.currentTime = time;
    };
};

ws.onclose = function(event) {
    console.log("Disconnected from WebSocket server");
};

ws.onerror = function(error) {
    console.error("WebSocket error: ", error);
};