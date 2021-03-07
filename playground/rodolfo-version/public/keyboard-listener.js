export const createKeyboardListener = (document) => {
  let currentPlayerId = 'rodolfo';
  
  const state = { observers: [] };

  const subscribe = observerFunction => state.observers.push(observerFunction);

  const notifyAll = command => state.observers.map(observerFunction => observerFunction(command));

  document.addEventListener('keydown', event => notifyAll({ 
    playerId: currentPlayerId,
    keyPressed: event.key,
  }));

  return {
    subscribe,
  };
}