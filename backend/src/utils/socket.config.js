// socketServer.js
import { Server } from 'socket.io';

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: '*' }  // Adjust for production as needed
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for video control events from the client
    // data format: { action: "play" | "pause" | "seek", roomId, currentTime }
    socket.on('videoEvent', (data) => {
      console.log(`Received video event from ${socket.id}:`, data);
      // Broadcast the video event to all other clients (within a room if implemented)
      socket.broadcast.emit('videoEvent', data);
    });

    // Listen for chat messages
    // data format: { sender: string, message: string, roomId }
    socket.on('chatMessage', (data) => {
      console.log(`Chat message from ${socket.id}:`, data);
      // Broadcast chat message to all clients (you can also limit it to a room)
      io.emit('chatMessage', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default createSocketServer;
