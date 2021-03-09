export const createKeyboardListener = document => {
  const state = {
    observers: [],
    playerId: null,
  };

  const registerPlayerId = playerId => state.playerId = playerId;
  
  const subscribe = observerFunction => state.observers.push(observerFunction);

  const unsubscribeAll = () => state.observers = [];

  const notifyAll = command => state.observers.map(observerFunction => observerFunction(command));

  document.addEventListener('keydown', event => notifyAll({ 
    type: 'move-player',
    playerId: state.playerId,
    keyPressed: event.key,
  }));

  return {
    registerPlayerId,
    subscribe,
    unsubscribeAll,
  };
}