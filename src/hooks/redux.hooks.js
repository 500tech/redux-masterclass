import React, { useState, useContext, useEffect } from 'react';
import { get, isFunction } from 'lodash/fp';
// import { ReactReduxContext } from 'react-redux';

const ReactReduxContext = React.createContext(null);

export const useStore = () => {
  const store = useContext(ReactReduxContext);

  return store;
};
const firstTime = Symbol('firstTime');

export const useSelector = (selector, ...args) => {
  const store = useStore();
  const selectorFn = isFunction(selector) ? selector : get(selector);
  let [curState, setCurState] = useState(firstTime);

  if (curState === firstTime) {
    curState = selectorFn(store.getState(), ...args);
  }

  useEffect(() => {
    return store.subscribe(() => {
      const nextState = selectorFn(store.getState(), ...args);

      if (nextState !== curState) {
        curState = nextState; // for this function closure
        setCurState(nextState); // for the component
      }
    });
  }, []);

  return curState;
};

export const createSelectorHook = selector => (...args) =>
  useSelector(selector, ...args);

export const useActions = (...actions) => {
  const store = useStore();

  return actions.map(action => (...args) => store.dispatch(action(...args)));
};

export const MyProvider = ({ store, children }) => (
  <ReactReduxContext.Provider value={store}>
    {children}
  </ReactReduxContext.Provider>
);
