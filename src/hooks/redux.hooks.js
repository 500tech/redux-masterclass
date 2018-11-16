import { useState, useContext, useEffect } from 'react';
import { ReactReduxContext } from 'react-redux';

export const useStore = () => {
  const { store } = useContext(ReactReduxContext);

  return store;
};

export const useSelector = (selector, ...args) => {
  const store = useStore();

  let prevState = selector(store.getState(), ...args);

  const [selected, setSelected] = useState(prevState);

  useEffect(() => {
    return store.subscribe(() => {
      const nextState = selector(store.getState(), ...args);

      if (nextState !== prevState) {
        prevState = nextState;
        setSelected(nextState);
      }
    });
  }, []);

  return prevState;
};

export const createSelectorHook = selector => (...args) =>
  useSelector(selector, ...args);

export const useActions = (...actions) => {
  const store = useStore();

  return actions.map(action => (...args) => store.dispatch(action(...args)));
};
