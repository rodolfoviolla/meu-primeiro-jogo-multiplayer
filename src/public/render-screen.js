const clearScreen = (context, tableBody) => {
  context.fillStyle = 'white';
  context.fillRect(0, 0, screen.width, screen.height);
  tableBody.innerHTML = '';
}

export const renderScreen = (screen, document, game, requestAnimationFrame, currentPlayerId) => {
  const context = screen.getContext('2d');
  const tableBody = document.getElementById('table-body');

  clearScreen(context, tableBody);

  game.state.players.map(player => {
    const fillColor = player.playerId === currentPlayerId ? '#F0DB4F' : 'black';

    context.fillStyle = fillColor;
    context.fillRect(player.playerX, player.playerY, 1, 1);

    const trElement = document.createElement('tr');
    const thIDElement = document.createElement('th');
    const thScoreElement = document.createElement('th');
    
    thIDElement.textContent = player.playerId;
    thScoreElement.textContent = player.score;

    trElement.appendChild(thIDElement);
    trElement.appendChild(thScoreElement);

    trElement.style.color = fillColor;

    tableBody.appendChild(trElement);
  });

  game.state.fruits.map(fruit => {
    context.fillStyle = 'green';
    context.fillRect(fruit.fruitX, fruit.fruitY, 1, 1);
  });

  requestAnimationFrame(() => renderScreen(screen, document, game, requestAnimationFrame, currentPlayerId));
}