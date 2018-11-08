const useStore = () => {
  const { store } = useContext(ReactReduxContext);

  return store;
};

const useSelector = selector => {
  const store = useStore();

  let prevState = selector(store.getState());

  const [selected, setSelected] = useState(prevState);

  useEffect(() => {
    return store.subscribe(() => {
      const nextState = selector(store.getState());

      if (nextState !== prevState) {
        prevState = nextState;
        setSelected(nextState);
      }
    });
  }, []);

  return prevState;
};

const useAction = action => {
  const store = useStore();

  return (...args) => store.dispatch(action(...args));
};
