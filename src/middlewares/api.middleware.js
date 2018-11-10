import { get } from 'lodash/fp';
import api from 'utils/api.utils';
import { startLoading, endLoading } from 'actions/network.actions';

const apiMiddleware = ({ dispatch }) => next => action => {
  if (!get('meta.api', action)) {
    return next(action);
  }

  next(action);
  dispatch(startLoading(action.payload.label));
  const { onSuccess } = action.payload;
  const response = api
    .request(action.payload)
    .then(response => {
      if (onSuccess) {
        dispatch(onSuccess(response.body));
        dispatch(endLoading(action.payload.label));
      }
    })
    .catch(e => {
      dispatch(endLoading(action.payload.label));
      console.error(e);
    });
};

export default apiMiddleware;
