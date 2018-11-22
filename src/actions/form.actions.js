export const SET_VALUE = '[FORM] Set Value';

export const setValue = (path, value) => ({
  type: SET_VALUE,
  payload: {
    path,
    value
  }
});
