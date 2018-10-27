import Loadable from 'react-loadable';
import Loading from 'components/loading';

const lazyLoad = loader =>
  Loadable({
    loader,
    loading: Loading
  });

export default lazyLoad;
