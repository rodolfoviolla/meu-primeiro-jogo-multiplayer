import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createGame } from './public/game.js';

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);
const port = 3000;

app.use(express.static('public'));

const game = createGame();

console.log(game.state);

sockets.on('connection', socket => {
  const playerId = socket.id;
  console.log(`> Player connected on server with id ${playerId}`);

  socket.emit('setup', game.state);
});

server.listen(port, () => console.log(`> Server listening on port ${port}`));