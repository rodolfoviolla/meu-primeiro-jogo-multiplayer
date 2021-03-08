export const createGame = () => {
  const state = {
    players: [],
    fruits: [],
    screen: { width: 30, height: 30 },
    fruitIntervalId: null,
  };

  const observers = [];

  const start = () => {
    if (!state.fruitIntervalId) {
      const fruitIntervalId = setInterval(addFruit, 2000);
      state.fruitIntervalId = fruitIntervalId;
  
      notifyAll({ type: 'game-start' });
    }
  }

  const stop = () => {
    if (state.fruitIntervalId) {
      clearInterval(state.fruitIntervalId);
      state.fruitIntervalId = null;
      notifyAll({ type: 'game-stop' });
    }
  }

  const subscribe = observerFunction => observers.push(observerFunction);

  const notifyAll = command => observers.map(observerFunction => observerFunction(command));

  const setState = newState => Object.assign(state, newState);

  const addPlayer = command => {
    const { playerId, playerX: x, playerY: y } = command;
    const playerX = x ? x : Math.floor(Math.random() * state.screen.width);
    const playerY = y ? y : Math.floor(Math.random() * state.screen.height);

    state.players.push({ playerId, playerX, playerY, score: 0 });

    notifyAll({ type: 'add-player', playerId, playerX, playerY, score: 0 });
  }

  const addFruit = command => {
    const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000);
    const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
    const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

    state.fruits.push({ fruitId, fruitX, fruitY });

    notifyAll({ type: 'add-fruit', fruitId, fruitX, fruitY });
  }

  const removePlayer = command => {
    const { playerId } = command;
    const playerIndexToRemove = state.players.findIndex(player => player.playerId === playerId);

    if (playerIndexToRemove > -1) {
      state.players.splice(playerIndexToRemove, 1);
      notifyAll({ type: 'remove-player', playerId });
    }
  }

  const removeFruit = command => {
    const { fruitId } = command;
    const fruitIndexToRemove = state.fruits.findIndex(fruit => fruit.fruitId === fruitId);

    if (fruitIndexToRemove > -1) {
      state.fruits.splice(fruitIndexToRemove, 1);
      notifyAll({ type: 'remove-fruit', fruitId });
    } 
  }

  const movePlayer = command => {
    notifyAll(command);

    const { playerId, keyPressed } = command;
    const player = state.players.find(player => player.playerId === playerId);
    const screenHeightLimit = state.screen.height - 1;
    const screenWidthLimit = state.screen.width - 1;

    const checkForFruitCollision = player => {
      const fruitToRemove = state.fruits.find(fruit => fruit.fruitX === player.playerX && fruit.fruitY === player.playerY);

      if (fruitToRemove) {
        removeFruit(fruitToRemove);
        addScore(player);
      }
    }

    const acceptedMoves = {
      ArrowUp(player) {
        player.playerY = player.playerY === 0 ? screenHeightLimit : player.playerY - 1
      },
      ArrowDown(player) {
        player.playerY = player.playerY === screenHeightLimit ? 0 : player.playerY + 1
      },
      ArrowLeft(player) {
        player.playerX = player.playerX === 0 ? screenWidthLimit : player.playerX - 1
      },
      ArrowRight(player) {
        player.playerX = player.playerX === screenWidthLimit ? 0 : player.playerX + 1
      },
    };

    const moveFunction = acceptedMoves[keyPressed];
    
    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitCollision(player);
    }
  }

    const addScore = command => {
      const { playerId } = command;
      const player = state.players.find(player => player.playerId === playerId);

      player.score++;
    } 

  return {
    state,
    start,
    stop,
    subscribe,
    setState,
    addPlayer,
    addFruit,
    removePlayer,
    removeFruit,
    movePlayer,
    addScore,
  };
}