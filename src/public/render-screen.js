export const renderScreen = (screen, game, requestAnimationFrame, currentPlayerId) => {
  const context = screen.getContext('2d');

  context.fillStyle = 'white';
  context.fillRect(0, 0, screen.width, screen.height);

  game.state.players.map(player => {
    context.fillStyle = 'black';
    context.fillRect(player.playerX, player.playerY, 1, 1);
  });

  game.state.fruits.map(fruit => {
    context.fillStyle = 'green';
    context.fillRect(fruit.fruitX, fruit.fruitY, 1, 1);
  });

  const currentPlayer = game.state.players.find(player => player.playerId === currentPlayerId);

  if (currentPlayer) {
    context.fillStyle = '#F0DB4F';
    context.fillRect(currentPlayer.playerX, currentPlayer.playerY, 1, 1);
  }

  requestAnimationFrame(() => renderScreen(screen, game, requestAnimationFrame, currentPlayerId));
}