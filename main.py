from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: int):
        await websocket.accept()
        await self.broadcast(f"Client #{client_id} joined the chat")
        self.active_connections[client_id] = websocket

    async def disconnect(self, client_id: int):
        self.active_connections.pop(client_id, None)
        await self.broadcast(f"Client #{client_id} left the chat")

    async def send_message_to_others(self, client_id: int, message: str):
        for id, connection in self.active_connections.items():
            if client_id == id:
                continue
            await connection.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_message_to_others(client_id, data)
    except WebSocketDisconnect:
        await manager.disconnect(client_id)
