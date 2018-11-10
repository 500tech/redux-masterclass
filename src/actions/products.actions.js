export const FETCH_PRODUCTS = '[Products] Fetch Products';
export const SET_PRODUCTS = '[Products] Set Products';

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
  meta: {
    api: true
  },
  payload: {
    url: '/products',
    method: 'GET',
    label: 'products',
    onSuccess: body => ({
      type: SET_PRODUCTS,
      payload: body
    })
  }
});
