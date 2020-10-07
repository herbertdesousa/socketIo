import express from 'express';
import cors from 'cors';
import * as socketIo from 'socket.io';
import { createServer, Server } from 'http';

interface ChatMessage {
  author: string;
  message: string;
}

const app = express();

app.use(cors());
app.options('*', cors());

const server = createServer(app);

const io = socketIo.listen(server);

server.listen(3333, () => {
  console.log('server started at port 3333');
})
io.on('connect', (socket: any) => {
  console.log('connected client on port 3333');

  socket.on('message', (message: ChatMessage) => {
    console.log('[server](message): ', JSON.stringify(message));
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
})
