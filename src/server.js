import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createGame } from './public/game.js';

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);
const port = 3000;

app.use(express.static('src/public'));

const game = createGame();

game.subscribe(command => {
  console.log(`> Emitting ${command.type}`);
  sockets.emit(command.type, command);
});

sockets.on('connection', socket => {
  const playerId = socket.id;
  console.log(`> Player connected: ${playerId}`);

  game.addPlayer({ playerId });

  socket.emit('setup', game.state);

  socket.on('disconnect', () => {
    game.removePlayer({ playerId });
    console.log(`> Player disconnected: ${playerId}`);
  });

  socket.on('move-player', command => {
    command.playerId = playerId;
    command.type = 'move-player';

    game.movePlayer(command);
  });

  socket.on('game-start', () => game.start());

  socket.on('game-stop', () => game.stop());
});

server.listen(port, () => console.log(`> Server listening on port ${port}`));