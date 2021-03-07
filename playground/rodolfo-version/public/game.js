export const createGame = () => {
  const state = {
    players: [],
    fruits: [],
    screen: { width: 10, height: 10 },
  };

  const addPlayer = command => state.players.push(command);

  const addFruit = command => state.fruits.push(command);

  const removePlayer = command => {
    const playerIndexToRemove = state.players.findIndex(player => player.id === command.id);

    if (playerIndexToRemove > -1) state.players.splice(playerIndexToRemove, 1);
  }

  const removeFruit = command => {
    const fruitIndexToRemove = state.fruits.findIndex(fruit => fruit.x === command.x && fruit.y === command.y);

    if (fruitIndexToRemove > -1) state.fruits.splice(fruitIndexToRemove, 1);
  }

  const movePlayer = command => {
    const { playerId, keyPressed } = command;
    const player = state.players.find(player => player.id === playerId);
    const screenHeightLimit = state.screen.height - 1;
    const screenWidthLimit = state.screen.width - 1;

    const checkForFruitCollision = player => {
      const fruitToRemove = state.fruits.find(fruit => fruit.x === player.x && fruit.y === player.y);

      if (fruitToRemove) removeFruit(fruitToRemove);
    }

    const acceptedMoves = {
      ArrowUp(player) {
        player.y = player.y === 0 ? screenHeightLimit : player.y - 1
      },
      ArrowDown(player) {
        player.y = player.y === screenHeightLimit ? 0 : player.y + 1
      },
      ArrowLeft(player) {
        player.x = player.x === 0 ? screenWidthLimit : player.x - 1
      },
      ArrowRight(player) {
        player.x = player.x === screenWidthLimit ? 0 : player.x + 1
      },
    };

    const moveFunction = acceptedMoves[keyPressed];
    
    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitCollision(player);
    }
  }

  return {
    state,
    addPlayer,
    addFruit,
    removePlayer,
    removeFruit,    
    movePlayer,
  };
}