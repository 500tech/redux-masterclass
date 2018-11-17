import React, { useState, useContext, useEffect } from 'react';
import { get, some, values } from 'lodash/fp';

const ReactReduxContext = React.createContext(null);

const isFunction = value => typeof value === 'function';
function shallowCopy(value) {
  if (Array.isArray(value)) return value.slice();
  const target = value.__proto__ === undefined ? Object.create(null) : {};
  return Object.assign(target, value);
}

function isProxyable(value) {
  if (!value) return false;
  if (typeof value !== 'object') return false;
  if (Array.isArray(value)) return true;
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

const handler = (paths, basePath) => ({
  get: (target, key) => {
    // console.log('get', target, key);
    const path = [basePath, key].filter(item => item).join('.');
    const value = target[key];

    if (isProxyable(value)) {
      return new Proxy(shallowCopy(value), handler(paths, path));
    } else {
      paths.push(path);
    }

    return value;
  }
});

const wrapSelector = selector => {
  const paths = [];
  const shouldRun = (prevState, nextState) => {
    return some(path => get(path, nextState) !== get(path, prevState), paths);
  };

  return [
    (state, ...args) => {
      paths.length = 0;
      const result = selector(
        new Proxy(shallowCopy(state), handler(paths)),
        ...args
      );
      // console.log('after', paths);
      JSON.stringify(result);
      return result;
    },
    shouldRun
  ];
};

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

export const createSelectorHook = selector => {
  const selectorFn = isFunction(selector) ? selector : get(selector);
  const [wrappedSelector, shouldRun] = wrapSelector(selectorFn);
  let prevState;

  return (...args) => {
    const store = useStore();
    let [result, setResult] = useState(firstTime);

    if (result === firstTime) {
      result = wrappedSelector(store.getState(), ...args);
    }

    useEffect(() => {
      prevState = store.getState();
      return store.subscribe(() => {
        const nextState = store.getState();
        // console.log(nextState, prevState);

        if (shouldRun(prevState, nextState)) {
          const nextResult = wrappedSelector(store.getState(), ...args);

          if (nextResult !== result) {
            result = nextResult; // for this function closure
            setResult(nextResult); // for the component
          }
        }
        prevState = store.getState();
      });
    }, []);

    return result;
  };
};

export const useActions = (...actions) => {
  const store = useStore();

  return actions.map(action => (...args) => store.dispatch(action(...args)));
};

export const MyProvider = ({ store, children }) => (
  <ReactReduxContext.Provider value={store}>
    {children}
  </ReactReduxContext.Provider>
);

// const selectFilteredProducts = state => {
//   const products = state.products;
//   const filter = state.ui.filter;

//   return products
//     ? values(products).filter(product =>
//         product.title.toLowerCase().includes(filter.toLowerCase())
//       )
//     : null;
// };

// const [selector] = wrapSelector(selectFilteredProducts);

// const prods = selector({
//   products: {},
//   ui: { filter: 'Ad' }
// });
// console.log(prods);
