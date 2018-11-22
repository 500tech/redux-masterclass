import React, { useState, useContext, useEffect } from 'react';

const isFunction = value => typeof value === 'function';
const get = path => obj => {
  const properties = path.split('.');
  let result = obj;
  for (let prop of properties) {
    if (result === undefined || result === null) {
      return result;
    }

    result = result[prop];
  }
  return result;
};
const ReactReduxContext = React.createContext(null);

export const useStore = () => {
  const store = useContext(ReactReduxContext);

  return store;
};
const firstTime = Symbol('firstTime');

export const useSelector = (selector, ...args) => {
  const store = useStore();
  const selectorFn = isFunction(selector) ? selector : get(selector);
  let [curResult, setCurResult] = useState(firstTime);

  if (curResult === firstTime) {
    curResult = selectorFn(store.getState(), ...args);
  }

  useEffect(() => {
    return store.subscribe(() => {
      const nextResult = selectorFn(store.getState(), ...args);

      if (nextResult !== curResult) {
        curResult = nextResult; // for this function closure
        setCurResult(nextResult); // for the component
      }
    });
  }, []);

  return curResult;
};
export const createSelectorHook = selector => (...args) =>
  useSelector(selector, ...args);

export const useActions = (...actions) => {
  const store = useStore();

  return actions.map(action => (...args) => store.dispatch(action(...args)));
};

export const useDispatch = () => {
  const store = useStore();

  return store.dispatch.bind(store);
};

export const Provider = ({ store, children }) => (
  <ReactReduxContext.Provider value={store}>
    {children}
  </ReactReduxContext.Provider>
);
