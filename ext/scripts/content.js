chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Running on:", window.location.href);
  if (message.action === "EXTENSION_CLICKED") {
    myFunction();
  }
});

function myFunction() {
  console.log("Extension clicked inside content script!");
}