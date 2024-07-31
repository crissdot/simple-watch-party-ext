const clientId = parseInt(Date.now() * Math.random());
const ws = new WebSocket("wss://localhost:8000/ws/" + clientId);

ws.onopen = function(event) {
    console.log("Connected to WebSocket server");
};

ws.onmessage = function(event) {
    console.log("Message from server: ", event.data);
};

ws.onclose = function(event) {
    console.log("Disconnected from WebSocket server");
};

ws.onerror = function(error) {
    console.error("WebSocket error: ", error);
};