let video = null;
let playerControls = null;

function addVideoPlayerListeners() {
  video.onloadstart = (event) => {
    console.log('onloadstart event');
  };

  video.ondurationchange = (event) => {
    console.log('ondurationchange event');
  };
  
  video.onloadedmetadata = (event) => {
    console.log('onloadedmetadata event');
  };

  video.onloadeddata = (event) => {
    console.log('onloadeddata event');
  };

  video.onprogress = (event) => {
    console.log('onprogress event');
  };

  video.oncanplay = (event) => {
    console.log('oncanplay event');
  };

  video.oncanplaythrough = (event) => {
    console.log('oncanplaythrough event');
  };

  video.onplay = (event) => {
    console.log('onplay event');
    sendPlayEvent();
  };

  video.onplaying = (event) => {
    console.log('onplaying event');
  };

  video.ontimeupdate = (event) => {
    console.log('ontimeupdate event');
  };

  video.onended = (event) => {
    console.log('onended event');
  };
  
  video.onabort = (event) => {
    console.log('onabort event');
  };
  
  video.onemptied = (event) => {
    console.log('onemptied event');
  };

  video.onerror = (event) => {
    console.log('onerror event');
  };

  video.onratechange = (event) => {
    console.log('onratechange event');
  };

  video.onseeked = (event) => {
    console.log('onseeked event');
  };

  video.onseeking = (event) => {
    console.log('onseeking event');
  };

  video.onstalled = (event) => {
    console.log('onstalled event');
  };

  video.onsuspend = (event) => {
    console.log('onsuspend event');
  };

  video.onvolumechange = (event) => {
    console.log('onvolumechange event');
  };

  video.onwaiting = (event) => {
    console.log('onwaiting event');
  };

  video.onpause = (event) => {
    console.log('onpause event');
    sendPauseEvent();
  };

  // TODO
  // let lastCurrentTime;
  // video.addEventListener('timeupdate', () => {
  //   if (dataReceived?.startsWith('time:')) return;
  //   if (Math.abs(lastCurrentTime - video.currentTime) > 2) {
  //     ws.send('time:' + video.currentTime);
  //   }
  //   lastCurrentTime = video.currentTime;
  // });
}

function playVideo() {
  if (!video || !playerControls) console.log('Cannot play video remotely');
  if (video.paused) playerControls.click();
}

function pauseVideo() {
  if (!video || !playerControls) console.log('Cannot pause video remotely');
  if (!video.paused) playerControls.click();
}