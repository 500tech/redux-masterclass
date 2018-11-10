export const START_LOADING = '[UI] Start Loading';
export const END_LOADING = '[UI] End Loading';

export const startLoading = label => ({
  type: START_LOADING,
  payload: label
});

export const endLoading = label => ({
  type: END_LOADING,
  payload: label
});
