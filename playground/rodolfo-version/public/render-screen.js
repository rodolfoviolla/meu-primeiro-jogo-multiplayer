export const renderScreen = (screen, game, requestAnimationFrame) => {
  const context = screen.getContext('2d');

  context.fillStyle = 'white';
  context.fillRect(0, 0, screen.width, screen.height);

  game.state.players.map(player => {
    context.fillStyle = 'black';
    context.fillRect(player.x, player.y, 1, 1);
  });

  game.state.fruits.map(fruit => {
    context.fillStyle = 'green';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  });

  requestAnimationFrame(() => renderScreen(screen, game, requestAnimationFrame));
}